# Secrets-cli

> commands list for interact with app use `oclif framework for cli`

- npx . users:create --user kalix --pass pass123,
- npx . users:list,
- npx . secrets:create --user kalix --name dev --value "New secrets",
- npx . secrets:list --user kalix,
- npx . secrets:get --user kalix --name dev,
- npx . secrets:update --user kalix --name dev --value "New secrets",
- npx . secrets:delete --user kalix --name dev

> docker command

- docker run --rm --name pg-docker -e POSTGRES_PASSWORD=pg123 -d -p 5432:5432 postgres
- docker-compose --compatibility up -d
  querypie app to manage postgresql

> Para ejecutar sequelize como esta instalado cli se debe usar

- npx sequelize --help

- TODO investigar como usar UUID type en postgres y sqlite y ver como lo genero desde js o de postgres automatico

## TODO

- Revisar los metodos de sqlite y postgres nativo si cumplen con los cambios hechos en el sequelize
