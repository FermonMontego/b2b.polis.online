FROM php:8.4-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl unzip libonig-dev libxml2-dev libzip-dev git nodejs npm \
    && docker-php-ext-install -j$(nproc) pdo_mysql mbstring zip bcmath \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -m -u 1000 www && chown -R www:www /var/www
USER www

WORKDIR /var/www

EXPOSE 8000

CMD ["sh", "-c", "composer setup && php artisan serve --host=0.0.0.0 --port=8000"]