#!/bin/sh
set -e

echo "Deploying application ..."

# Enter maintenance mode
(php artisan down) || true
    # Install dependencies based on lock file
    COMPOSER_ALLOW_SUPERUSER=1 composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

    # Storage permissions
    sudo chown -R www-data:www-data storage

    # Migrate database
    php artisan migrate --force

    # Build assets
    npm install --ignore-engines
    npm run build --ignore-engines

    # Clear cache
    php artisan clear-compiled
    php artisan optimize

    # Reload PHP to update opcache
    sudo -S service php8.3-fpm reload
# Exit maintenance mode
php artisan up

echo "Application deployed!"
