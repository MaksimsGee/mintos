<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191022182516 extends AbstractMigration
{
    public function getDescription() : string
    {
        return 'Init schema migration';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE failed_jobs (id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL, connection TEXT NOT NULL COLLATE utf8mb4_unicode_ci, queue TEXT NOT NULL COLLATE utf8mb4_unicode_ci, payload LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci, exception LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci, failed_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE migrations (id INT UNSIGNED AUTO_INCREMENT NOT NULL, migration VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, batch INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE password_resets (email VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, token VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, created_at DATETIME DEFAULT NULL, INDEX password_resets_email_index (email)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');

        $this->addSql('CREATE TABLE excludes (id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE UNIQUE INDEX excludes_name_unique ON excludes (name)');

        $this->addSql('
            CREATE TABLE users (
                id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL, 
                name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, 
                email VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, 
                email_verified_at DATETIME DEFAULT NULL, 
                email_canonical VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, 
                username VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, 
                roles VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, 
                salt VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, 
                confirmation_token VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, 
                last_login DATETIME DEFAULT NULL, 
                password_requested_at DATETIME DEFAULT NULL, 
                enabled INT(11) DEFAULT `1` COLLATE utf8mb4_unicode_ci, 
                username_canonical VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, 
                password VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, 
                remember_token VARCHAR(100) DEFAULT NULL COLLATE utf8mb4_unicode_ci, 
                created_at DATETIME DEFAULT NULL, 
                updated_at DATETIME DEFAULT NULL, 
                INDEX excludes_name_index (name)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE UNIQUE INDEX users_email_unique ON users (email)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE failed_jobs');
        $this->addSql('DROP TABLE migrations');
        $this->addSql('DROP TABLE password_resets');
        $this->addSql('DROP TABLE excludes');
        $this->addSql('DROP TABLE users');
    }
}
