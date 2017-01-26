FROM php:7-apache

RUN apt-get update
RUN apt-get install -y git zip unzip libicu-dev libmysqlclient18
RUN docker-php-ext-configure intl
RUN docker-php-ext-install intl pdo_mysql

RUN a2enmod headers
RUN a2enmod rewrite

WORKDIR /var/www/html

RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer
