## Installation

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
REDIS_HOST=
REDIS_PORT=
REDIS_USER=
REDIS_PASSWORD=
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

## Docker

Will update as soon as possible
