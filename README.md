# isra-hayom-app

Dockerhub
	commands:
		docker pull nggawt/israpp:israpp
github
	a. git@github.com:nggawt/israel-hyom-test.git
	b. https://github.com/nggawt/israel-hyom-test

Production site
	https://nwt.ddns.net
	
Instructions
	1 create docker-compose.yml file
	2 copy paste below instroction into docker-compose.yml file
	
###

version: '2'
services:
  mariadb:
    image: docker.io/bitnami/mariadb:10.6
    environment:
      # ALLOW_EMPTY_PASSWORD is recommended only for development.
      - ALLOW_EMPTY_PASSWORD=yes
      - MARIADB_USER=isra_user
      - MARIADB_DATABASE=isra_db
  israpp:
    image: nggawt/israpp:israpp
    ports:
      - '8082:8000'
    environment:
      - DB_HOST=mariadb
      - DB_PORT=3306
      - DB_USERNAME=isra_user
      - DB_DATABASE=isra_db
    volumes:
      - './laravel-react:/app'
    depends_on:
      - mariadb
      
 ###
     
	3. create diroctry named "laravel-react"
	4. run command:
			docker compose up --buld -d
	5. go to diroctry "laravel-react"
	6. create .env file
	7. copy paste below instroction into .env file
	
###

APP_NAME=writers
APP_ENV=local
APP_KEY=base64:T2iir2UaIS59tby6wonePT8S7e+NUXMaJSINdW0BYN4=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=isra_db
DB_USERNAME=isra_user
DB_PASSWORD=

TIME_ZONE=Asia/Jerusalem

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=true
SESSION_DOMAIN=localhost
SESSION_HTTPS_ONLY=true
SESSION_HTTP_ONLY=true
SESSION_SAME_SITE=lax
 
MIX_LOCAL_URL=http://localhost
MIX_WEB_URL=https://nwt.ddns.net
MIX_SECRET_CODE=
MIX_PROXY_PORT=8082
MIX_PORT=8088

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=predis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

JWT_TTL=1
JWT_SECRET=fZZXfLO5Ab5lAua5QSnjqtlu84BGgTkTXnZ4XVZ4yQCJ4PyWANx8utnPYoVKwjLW

###

	8. run commands:
		a. composer install
		b. npm install
		c. docker compose exec israpp php artisan migrate:fresh --seed
		d. npm run prod
	9. open browser with url "http://localhost:8082"
	
features
	1. authentication registration , login system
	2. view postes with in carousel infinite loop and only if has post in last 2 weeks order by created at
	3. view writer in table order by alphabetically
	4. react redux crud operation and caching system by end point url
	5. code documention
