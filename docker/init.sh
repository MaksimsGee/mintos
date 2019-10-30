#!/bin/bash

# Returns true once mysql can connect.
mysql_ready() {
    mysqladmin ping --host=${MYSQL_HOST} --user=${MYSQL_ROOT_USERNAME} --password=${MYSQL_ROOT_PASSWORD} > /dev/null 2>&1
}

echo "Install php dependencies..."
cd /srv/www/api/laravel && composer install
cd /srv/www/api/symfony && composer install
cd /srv/www/api/yii2 && composer install
echo "Dependencies installed..."

# TODO: did not worked with "wikimedia/composer-merge-plugin" as expected
#COMPOSER_FILE=/srv/www/docker/.composer-installed
#while [ ! -f "$COMPOSER_FILE" ]
#do
#    echo "Waiting for php dependencies..."
#    sleep 20
#done

while !(mysql_ready)
do
   echo "Waiting for mysql ..."
   sleep 5
done

echo "mysql found..."

DBEXISTS=$(mysql -u ${MYSQL_ROOT_USER} -p${MYSQL_ROOT_PASSWORD} --batch --skip-column-names -e "SHOW DATABASES LIKE '"${MYSQL_DATABASE}"';" | grep "${MYSQL_DATABASE}" > /dev/null; echo "$?")

if [ $DBEXISTS -eq 1 ];then
    echo  "Schema not found, creating new schema..."
    mysql -u ${MYSQL_ROOT_USER} -p${MYSQL_ROOT_PASSWORD} -e "CREATE DATABASE ${MYSQL_DATABASE}; GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'%'; FLUSH PRIVILEGES;"
    echo  "Schema created..."
else
    echo "Schema found..."
fi

echo "Starting initialization..."

echo "Setting chown && chmod.."
#chown -R www-data:www-data /srv/www
chmod -R 777 /srv/www/api/laravel/storage
chmod -R 777 /srv/www/api/laravel/bootstrap/cache
chmod -R 777 /srv/www/api/symfony/var
chmod -R 755 /srv/www/api/symfony/config/jwt
# yii2 not implemented
#chmod -R 777 /srv/www/api/yii2/runtime

FILE=/srv/www/docker/.builded

if [ ! -f "$FILE" ] || [ "${FORCE_FRESH}" = "true" ];then

    if [ "${API_URL}" = "http://127.0.0.1:9000/api" ];then
        echo "laravel"

        echo "Running fresh migrations and seed data..."
        cd /srv/www/api/laravel && APP_ENV=${API_ENV} php artisan migrate:refresh --seed

        echo "Symlink linking storage..."
        cd /srv/www/api/laravel && APP_ENV=${API_ENV} php artisan storage:link

        echo "" > $FILE
    fi

    if [ "${API_URL}" = "http://127.0.0.1:9001/api" ];then
      echo "symfony"

      echo "Clean database..."
      cd /srv/www/api/symfony && yes | APP_ENV=${API_ENV} php bin/console doctrine:migrations:migrate first

      echo "Running migration..."
      cd /srv/www/api/symfony && APP_ENV=${API_ENV} php bin/console doctrine:migrations:migrate

      echo "Seed database..."
      cd /srv/www/api/symfony && APP_ENV=${API_ENV} php bin/console doctrine:fixtures:load

      echo "" > $FILE
    fi

    if [ "${API_URL}" = "http://127.0.0.1:9002/api" ];then
        echo "yii"

        echo "" > $FILE
    fi
fi

echo "Initialization finished successfully"
