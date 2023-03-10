## Start with Docker

Install [Docker](https://www.docker.com/) .

Create .ENV file according to the structure of the file .env-example for environments...

```sh
HOST=localhost
PORT=1999
CONSOLE_LOG_LEVEL=OFF
FILE_LOG_LEVEL=TRACE
LOG_RESPONSE_ENV=default
LOG_ERROR_ENV=file
MONGO_CONNECTION_STRING=
DB_USER=
DB_PASS=
REDIS_CONNECTION_STRING=
JWT_SECRET=duycntduycnt
ACCESS_TOKEN_EXPIRE=3d
REFRESH_TOKEN_EXPIRE=7d
```

```sh
docker-compose up
```

The docker exec command in container mongodb-primary

```sh
docker-compose exec mongodb-primary mongo
```

Setup replica set

```sh
var config = {
    "_id": "rs0",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongodb-primary:27017",
            "priority": 3
        },
        {
            "_id": 2,
            "host": "mongodb-secondary-1:27017",
            "priority": 2
        },
        {
            "_id": 3,
            "host": "mongodb-secondary-2:27017",
            "priority": 1
        }
    ]
};

rs.initiate(config, { force: true });
rs.status();
```

## Start normal

App requires [Node.js](https://nodejs.org/), [Redis](https://www.npmjs.com/package/redis), [MongoDb](https://www.mongodb.com/try/download/community) to run.

Install the dependencies and devDependencies and start the server.

```sh
yarn
```

or

```sh
npm i
```

Create .ENV file according to the structure of the file .env-example for environments...

```sh
HOST=localhost
PORT=1999
CONSOLE_LOG_LEVEL=OFF
FILE_LOG_LEVEL=TRACE
LOG_RESPONSE_ENV=default
LOG_ERROR_ENV=file
MONGO_CONNECTION_STRING=
DB_USER=
DB_PASS=
REDIS_CONNECTION_STRING=
JWT_SECRET=duycntduycnt
ACCESS_TOKEN_EXPIRE=3d
REFRESH_TOKEN_EXPIRE=7d
```

Start server

```sh
yarn start
```

or

```sh
npm start
```
