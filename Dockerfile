# gebruikt de officiele PHP image
FROM php:7.2-apache

#installeerd de mysqli extensie
RUN docker-php-ext-install mysqli

#kopieert de bestanden van de huidige map naar de apache root container
COPY ./webshop-2.0 /var/www/html
