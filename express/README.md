# Backend: ExpressJS

| app         | host      | port |
| ----------- | --------- | ---- |
| **express** | localhost | 5000 |

<br />

### Config env file

```shell
cp .env.example .env
```

Edit .env file
```shell
port=<your_port>
mongoURI=<your_mongoDB_Atlas_uri_with_credentials>
jwtSecret=<your_secret_key>
```


### How to run

#

Development
```shell
yarn start:dev
```

Lint
```shell
yarn lint
```

Lint fix
```shell
yarn lint:fix
```

Build
```shell
yarn build
```

Production
```shell
yarn start:prod
```

