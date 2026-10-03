FROM php:8.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    git \
    unzip \
    curl \
    libzip-dev \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install \
        pdo_pgsql \
        zip \
    && rm -rf /var/lib/apt/lists/*
    

WORKDIR /var/www

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

RUN chown -R www-data:www-data /var/www

# Install JS dependencies
RUN npm install

EXPOSE 9000 5173 4321

CMD ["php-fpm"]