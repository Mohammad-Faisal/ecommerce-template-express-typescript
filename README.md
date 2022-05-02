# Run locally

Create a local postgres server up and running

```sh
docker run --name postgresql -e POSTGRES_USER=testdb -e POSTGRES_PASSWORD=testpassword -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres
```

And change the `.env` file to connect to the local database

```sh
PORT = 5000
DB_TYPE = postgres
DB_URL = localhost
DB_PORT = 5432
DB_NAME = postgres
DB_USER_NAME = testdb
DB_PASSWORD = testpassword
```

In some cases you will face error if you use `localhost`. So you can get the public ip of your local machine and replace it in the environment file.

Then run the following command.

```sh
docker-compose up
```

# Step 2

Create a firebase project and get the `serviceAccountKey.json` file and put it inside the project

### to see all docker images

```

sudo docker images

```

### to see the status of docker images

```

sudo docker build -t 56faisal/typescript-starter .

```

### build the docker image

sudo docker build -t 56faisal/typescript-starter .

### push docker image to dockerhub

```

sudo docker login -u "username" -p "password" docker.io

```

```

docker push 56faisal/typescript-starter:tagname

```

### pull docker image

```

56faisal/typescript-starter

```

### to run the docker image

```

docker run --rm -it -p 80:5000/tcp rokkhi-products-services-backend:latest

```

- here 8888 is the port open to the world and 3001 is the port in which our application is running

```

```
