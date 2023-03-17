# This repo contains an example on how to produce JSON messages compressed with msgpack into kafka, and loading them as a CH table using Kafka engine table.

## Dependencies

Node 18
Docker
Yarn

## Run demo

```
yarn start:services
yarn install
yarn kafka:create:topic

clickhouse-client --host localhost --port 9011

# copy paste the contents of docker/init.sql into your database

yarn emit:message
```

Now you should be able to see events being sent to the messages table
