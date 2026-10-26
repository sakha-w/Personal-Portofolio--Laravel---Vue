FROM node:22-bookworm-slim AS frontend-development
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
COPY package.json package-lock.json .npmrc ./
RUN npm ci --include=dev
COPY astro.config.mjs tsconfig.json ./
COPY src ./src
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4321", "--ignore-lock"]

FROM frontend-development AS frontend-build
RUN npm run build && npm prune --omit=dev

FROM node:22-bookworm-slim AS frontend
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321 ASTRO_TELEMETRY_DISABLED=1
COPY --from=frontend-build --chown=node:node /app/package.json ./package.json
COPY --from=frontend-build --chown=node:node /app/node_modules ./node_modules
COPY --from=frontend-build --chown=node:node /app/dist ./dist
USER node
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]

FROM php:8.4-fpm AS backend-base
RUN apt-get update && apt-get install -y --no-install-recommends libpq-dev libzip-dev git unzip \
    && docker-php-ext-install pdo_pgsql zip \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /var/www
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN printf 'upload_max_filesize=2M\npost_max_size=8M\n' > /usr/local/etc/php/conf.d/uploads.ini

FROM backend-base AS development
COPY composer.json composer.lock ./
RUN composer install --prefer-dist --no-interaction --no-scripts --no-autoloader
COPY . .
RUN mkdir -p storage/app/public storage/app/private storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && composer dump-autoload --optimize --no-interaction \
    && chown -R www-data:www-data storage bootstrap/cache

FROM nginx:alpine AS gateway
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

FROM backend-base AS backend
ENV APP_ENV=production APP_DEBUG=false LOG_CHANNEL=stderr
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-scripts --no-autoloader
COPY app ./app
COPY bootstrap ./bootstrap
COPY config ./config
COPY database ./database
COPY routes ./routes
COPY resources ./resources
COPY public/index.php ./public/index.php
COPY artisan ./artisan
RUN mkdir -p storage/app/public storage/app/private storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && composer dump-autoload --no-dev --classmap-authoritative --no-interaction \
    && chown -R www-data:www-data storage bootstrap/cache
