# Motoenreel

### How to launch the project (dev)

1 - `$ docker-compose build --pull --no-cache`  
2 - `$ docker-compose up -d`

3 - `http://localhost:3000`

### How to launch the project (build)

1 - `$ docker build -t motonreel:latest .`  
2 - `$ docker run -p 3000:3000 motonreel:latest`

3 - `http://localhost:3000`
