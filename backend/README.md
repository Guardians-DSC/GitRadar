## 🏁 Iniciando

Você pode clonar o respositório com o git, com o seguinte comando:

```
git clone https://github.com/Guardians-DSC/GitRadar.git
```

### Pré-requisitos

Você precisará de NodeJS e Yarn (para facilitar o processo) no seu computador. <br>

- [NodeJS](https://nodejs.org/en/download/) <br>
- [Yarn](https://yarnpkg.com/getting-started/install)

### Instalando

No terminal, abra a pasta do projeto e abra a pasta do Backend.

```
cd GitRadar/backend
```

Então, digite:

```
yarn
```

<br> 
Antes de executar a aplicação, você precisa configurar alguns serviços, o primeiro deles é ter um Banco de Dados Postgres para a utilização da aplicação.

- [Link para a imagem Docker aqui.](https://hub.docker.com/_/postgres)

<br>
Com isso feito, você precisa criar um aplicativo OAuth com a sua conta do GitHub, a aplicação irá utilizá-la para permitir o uso das credenciais dos usuários e aumentar o limite de requisições.

- [Siga esse tutorial do GitHub para isso.](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/)

A sua página da aplicação deve ficar assim:
<img width="1100px" src="https://user-images.githubusercontent.com/40612788/99671001-2d424480-2a50-11eb-95a2-dea2c961b331.png"/>
<br>
Guarde os valores do ClientID e ClientSecret, você usará no ".env", além disso atente-se para as urls da aplicação, como a aplicação está sendo executada localmente, as urls direcionam para o frontend no endereço localhost, segue os campos em texto:

- Homepage URL: http://localhost:3000
- Authorization callback URL: http://localhost:3000/dashboard

Essa configuração serve para que a autenticação com o Github de um Manager seja possível. A maneira mais fácil e eficiente é executar o frontend e o backend simultaneamente para que você realize o vínculo através da interface gráfica do site.
<br><br>
Agora, precisamos configurar as variáveis de ambiente. Para isso, você deve copiar o arquivo ".env.sample" e
o renomear para ".env" na pasta raiz do Backend. Você precisa preencher os valores de todas as variáveis de acordo com o seu significado.
<br>
Segue o arquivo ".env" comentado:

```bash
# Informações do Banco de Dados Postgresql
DB_HOST=localhost # Endereço de acesso
DB_PORT=5432 # Porta de acesso
DB_USERNAME=example_username # Usuário do BD
DB_PASSWORD=example_password # Senha do BD
DB_NAME=database_name # Nome do Bando de Dados

# Informações do Aplicativo OAuth do GitHub
GITHUB_APP_CLIENT_ID=your_client_id # ClientID
GITHUB_APP_CLIENT_SECRET=your_client_secret # ClientSecret

# Informações de segurança para o GitRadar
JWT_SECRET=your_jwt_secret # Gere um código qualquer para servir como secret da autenticação JWT da aplicação. Recomendo usar geradores de hash online.

CRYPTO_SECRET=your_crypto_secret # Gere um código qualquer para servir como secret para encriptações na aplicação.
CRYPTO_IV=90b7fd08a94e987e6aeb910a79e26672 # Buffer em hexadecimal do Crypto IV usado nas encriptações da aplicação, recomendo deixar esse valor padrão.
```

Pronto! Tudo está configurado para você começar a usar o projeto.

## 🚀 Modo de uso

Com o Banco de Dados devidamente configurado, você deve executar as migrations da aplicação para que sejam criadas as tabelas necessárias. Execute o seguinte comando:

```
yarn typeorm migration:run
```

Agora, você pode iniciar o servidor local de desenvolvimento, com o seguinte comando:

```
yarn dev:server
```

# 🔎 Endpoints da API <a name = "endpoints"></a>

## Iniciar sessão com a conta de um Manager:

```
POST /session
```

Realiza a sessão de um Manager na aplicação, para realizar a requisição, deve-se enviar uma chave "email" com o e-mail do manager uma chave "password" com a senha, dessa forma, se recebe como retorno o token JWT para o uso em rotas autenticadas, exemplo de retorno:

```json
{
  "manager": {
    "id": "058bd335-1a2a-4856-8969-861d6707586a",
    "github_login": "AntonioNtV",
    "name": "Antonio Bertino de Vasconcelos Cabral Neto ",
    "email": "antoniontv1920@gmail.com",
    "github_token": null,
    "avatar_url": "https://avatars3.githubusercontent.com/u/38543529?v=4",
    "github_id": "38543529",
    "created_at": "2020-11-22T16:50:12.236Z",
    "updated_at": "2020-11-22T16:50:12.236Z"
  },
  "token": "TOKEN",
  "hasGithubToken": false
}
```

## ⭐ A partir daqui, todas as rotas são autenticadas.

## Listar Spots de um Projeto:

```
GET /project/:project_id
```

Listar todos os Spots de um projeto salvo na aplicação, exemplo de retorno:

```json
[
  {
    "id": "efdbc8b0-8a59-4247-9a65-d80bfc70967d",
    "manager_id": null,
    "github_login": "davigsousa",
    "avatar_url": "https://avatars3.githubusercontent.com/u/40612788?u=abb3a9982b62292b78f741ce47e8eb3a8803bd84&v=4",
    "top_language": "none",
    "github_id": "MDQ6VXNlcjQwNjEyNzg4",
    "name": "Davi Sousa",
    "created_at": "2020-11-21T16:17:12.464Z",
    "updated_at": "2020-11-21T16:17:12.464Z"
  },
  {
    "id": "464945d6-f905-481f-8f27-18d09d029240",
    "manager_id": null,
    "github_login": "arturbs",
    "avatar_url": "https://avatars3.githubusercontent.com/u/41977691?v=4",
    "top_language": "none",
    "github_id": "MDQ6VXNlcjQxOTc3Njkx",
    "name": "arturbs",
    "created_at": "2020-11-21T18:57:18.116Z",
    "updated_at": "2020-11-21T18:57:18.116Z"
  },
  {
    "id": "1a523c45-5b45-41cb-aec3-325618f60f1f",
    "manager_id": null,
    "github_login": "NathanLCR",
    "avatar_url": "https://avatars1.githubusercontent.com/u/48298897?u=6736c6de331e65dc08b6d79e6fbfac29919c2b3c&v=4",
    "top_language": "none",
    "github_id": "MDQ6VXNlcjQ4Mjk4ODk3",
    "name": "Nathan Lucio",
    "created_at": "2020-11-21T18:57:23.884Z",
    "updated_at": "2020-11-21T18:57:23.884Z"
  }
]
```

## Listar Spots do projeto com interações abaixo da média:

```
GET /project/:project_id/below_average?since=2020-10-02
```

Informando o parâmetro "since" na query, você informa o início do período de avaliação da média, outro parâmetro opcional na rota é "until" que delimita o final do período. Use essa rota para listar todos os spots de um projeto abaixo da média de interações, exemplo de retorno:

```json
[
  {
    "id": "1a523c45-5b45-41cb-aec3-325618f60f1f",
    "github_login": "NathanLCR",
    "manager_id": null,
    "avatar_url": "https://avatars1.githubusercontent.com/u/48298897?u=6736c6de331e65dc08b6d79e6fbfac29919c2b3c&v=4",
    "top_language": "none",
    "github_id": "MDQ6VXNlcjQ4Mjk4ODk3",
    "name": "Nathan Lucio",
    "created_at": "2020-11-21T18:57:23.884Z",
    "updated_at": "2020-11-21T18:57:23.884Z"
  },
  {
    "id": "2d624fbc-152e-46be-92f9-60e631ea8db0",
    "github_login": "HigorSnt",
    "manager_id": null,
    "avatar_url": "https://avatars1.githubusercontent.com/u/40602956?u=079b6f0f87e03d57e31081bba7c7809c7c9c14b8&v=4",
    "top_language": "none",
    "github_id": "MDQ6VXNlcjQwNjAyOTU2",
    "name": "Higor Santos",
    "created_at": "2020-11-21T18:56:12.970Z",
    "updated_at": "2020-11-21T18:56:12.970Z"
  }
]
```

## Obter Relatório do Projeto:

```
GET /project/:project_id/report?since=2020-10-02
```

Informando o parâmetro "since" na query, você informa o início do período, outro parâmetro opcional na rota é "until" que delimita o final do período. Use essa rota para obter o relatório de um projeto em um período, exemplo de retorno:

```json
{
  "all_new_interactions": 2,
  "all_new_commits": 0,
  "new_interactions_average": 0.25,
  "new_commits_average": 0
}
```

## Adicionar Spot no Projeto:

```
POST /spot
```

Adiciona-se um spot no projeto, para realizar a requisição, deve-se enviar uma chave "github_login" com o username do spot no Github, dessa forma, se recebe como retorno o spot criado, exemplo de retorno:

```json
{
  "github_login": "DaniloDMF",
  "avatar_url": "https://avatars1.githubusercontent.com/u/55511256?v=4",
  "repositories": [
    {
      "id": "a0826bd8-798f-4c98-bf21-85996aca234b",
      "name": "hello-world",
      "full_name": "DaniloDMF/hello-world",
      "description": null,
      "html_url": "https://github.com/DaniloDMF/hello-world"
    },
    {
      "id": "05348432-3086-4bfc-9806-06e144a438a3",
      "name": "README.md",
      "full_name": "DaniloDMF/README.md",
      "description": "README.md",
      "html_url": "https://github.com/DaniloDMF/README.md"
    },
    {
      "id": "c1e816bb-7f17-4cc0-a966-89fcb9cc3802",
      "name": "OlaMundo",
      "full_name": "DaniloDMF/OlaMundo",
      "description": null,
      "html_url": "https://github.com/DaniloDMF/OlaMundo"
    },
    {
      "id": "2a87f715-4ee3-4ff0-935d-03aa8ca44410",
      "name": "PWEB",
      "full_name": "DaniloDMF/PWEB",
      "description": null,
      "html_url": "https://github.com/DaniloDMF/PWEB"
    },
    {
      "id": "b8e58c79-9e93-4915-bc10-cdfb4f43191b",
      "name": "montanha-do-dragao-negro",
      "full_name": "DaniloDMF/montanha-do-dragao-negro",
      "description": null,
      "html_url": "https://github.com/DaniloDMF/montanha-do-dragao-negro"
    }
  ]
}
```

## Obtém a quantidade de interações por dia em um período de um Spot:

```
GET /spot/volume/:username/interactions?since=2020-11-02
```

Informando o parâmetro "since" na query, você informa o início do período, outro parâmetro opcional na rota é "until" que delimita o final do período. Obtém a quantidade de interações por dia de um spot, deve-se enviar o username do Github do spot como params :username, as quantidades são retornadas no seguinte modelo:

```json
[
  {
    "value": 10,
    "date": "2020-11-03T02:46:25.018Z"
  },
  {
    "value": 2,
    "date": "2020-11-04T02:46:25.018Z"
  },
  {
    "value": 21,
    "date": "2020-11-05T05:00:40.687Z"
  }
]
```

## Obtém a adição e remoção de linhas por dia em um período de um Spot:

```
GET /spot/volume/:username/lines?since=2020-11-02
```

Informando o parâmetro "since" na query, você informa o início do período, outro parâmetro opcional na rota é "until" que delimita o final do período. Obtém a quantidade adições e remoções de linhas de código por dia de um spot, deve-se enviar o username do Github do spot como params :username, as quantidades são retornadas no seguinte modelo:

```json
[
  {
    "gains": 1532,
    "loss": 15,
    "date": "2020-11-03T02:46:25.018Z"
  },
  {
    "gains": 1,
    "loss": 2,
    "date": "2020-11-04T02:46:25.018Z"
  },
  {
    "gains": 812,
    "loss": 153,
    "date": "2020-11-05T05:00:40.687Z"
  }
]
```

## Obter Relatório de um Spot:

```
GET /spot/:username/report?since=2020-10-02
```

Informando o parâmetro "since" na query, você informa o início do período, outro parâmetro opcional na rota é "until" que delimita o final do período. Use essa rota para obter o relatório de um spot em um período, exemplo de retorno:

```json
{
  "additions": 3950,
  "deletions": 819,
  "created_at": "2020-11-06T02:01:25.492Z",
  "new_commits": 67,
  "new_forks": 1,
  "new_interactions": 81,
  "new_issues": 2,
  "new_prs": 6,
  "new_repositories": 0,
  "new_stars": 5,
  "commits": [
    {
      "sha": "8c385901c215f23b4f5be2ca940a0fa829486a62",
      "additions": 1,
      "deletions": 1,
      "message": "Merge branch 'development' of https://github.com/Guardians-DSC/GitRadar into development"
    },
    {
      "sha": "62b278379696f3b9824be90df3d2d6cacde8da20",
      "additions": 287,
      "deletions": 6,
      "message": "Merge pull request #34 from Guardians-DSC/feature/ProfileGraphic\n\nAdicionar Gráfico de Interações por dia - Profile Page"
    }
  ]
}
```

## Adicionar Manager na aplicação:

```
POST /manager
```

Adiciona-se um Manger na aplicação, para realizar a requisição, deve-se enviar uma chave "github_login" com o username do Manager no Github, uma chave "email" com o e-mail do Manager e uma chave "password" no body da requisição, dessa forma, se recebe como retorno o Manager criado, exemplo de retorno:

```json
{
  "github_login": "AntonioNtV",
  "name": "Antonio Bertino de Vasconcelos Cabral Neto ",
  "email": "antoniontv1920@gmail.com",
  "avatar_url": "https://avatars3.githubusercontent.com/u/38543529?v=4",
  "github_id": 38543529,
  "id": "058bd335-1a2a-4856-8969-861d6707586a",
  "created_at": "2020-11-22T16:50:12.236Z",
  "updated_at": "2020-11-22T16:50:12.236Z"
}
```
