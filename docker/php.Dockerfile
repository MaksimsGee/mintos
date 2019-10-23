FROM php:7.3-fpm

ADD php/php-fpm.ini /usr/local/etc/php-fpm.d/www.conf

RUN apt-get update && apt-get install -y libmcrypt-dev \
            curl \
            zip libzip-dev \
            default-mysql-client \
            openssh-client \
            sendmail \
  && docker-php-ext-configure \
             zip --with-libzip=/usr/include \
  && docker-php-ext-install \
            mbstring \
            pdo_mysql \
            zip \
            iconv

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

WORKDIR /srv/www
