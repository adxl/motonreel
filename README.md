# Motoenreel

## How to launch the project

1 - Create the environment

- `$ cp ./client/.env.local ./client/.env`  
- `$ cp ./server/.env.local ./server/.env`  

2 - Start the containers

- `$ docker-compose build --pull --no-cache`  
- `$ docker-compose up -d`  

3 - Run the migrations

- `$ docker container exec motonreel_server node migrate.js`  

4 - Navigate to:

- Client : `http://localhost:3000`  
- Server : `http://localhost:9000`  

