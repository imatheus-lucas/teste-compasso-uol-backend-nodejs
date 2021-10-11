# Compasso UOL Teste

## Objetivo

-   Cadastrar cidade
-   Cadastrar cliente
-   Consultar cidade pelo nome
-   Consultar cidade pelo estado
-   Consultar cliente pelo nome
-   Consultar cliente pelo Id
-   Remover cliente
-   Alterar o nome do cliente

Considerando os dados

-   Cidades: nome e estado
-   Cliente: nome completo, sexo, data de nascimento, idade e cidade onde mora.

## Executar o projeto

```jsx
//subir bancos de dados
docker-compose up -d

//baixar dependecias
yarn install
//ou
npm install

//executar testes
yarn test

//subir o servidor
yarn dev
```

## Rotas cliente

```js
//POST
//http://localhost:3333/v1/clients
//create new client
{
		"name": string,
    "genrer": string,
    "birth_date": string,
    "years_old": integer,
    "cityId": string
}
```

```js
//GET
//http://localhost:3333/v1/clients/${id}
//search client by id
```

```js
//DELETE
//http://localhost:3333/v1/clients/${id}
//delete client by id
```

```js
//PATCH
//http://localhost:3333/v1/clients/${id}
//update name for client

{
	"name":string
}
```

## Rotas cidades

```js
//POST
//http://localhost:3333/v1/cities
//create new city
{
		"name": string,
    "state": string
}
```

```js
//GET
//http://localhost:3333/v1/cities?name=${name}
//http://localhost:3333/v1/cities?state=${state}
//search by name or state
```

## Tecnolgias

-   NodeJs
-   TypeOrm
-   Yup
-   Jest
-   Docker
-   TypeScript
-   Postgres
