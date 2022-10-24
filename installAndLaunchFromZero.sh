# /bin/bash

echo "Installing & Launching from zero to 100 real quick"

cp ./client/.env.local ./client/.env && 
cp ./server/.env.local ./server/.env && 
./install.sh  && 
docker-compose build --pull --no-cache && 
docker-compose up -d && 
docker container exec motonreel_server node migrate.js