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
Pronto! Tudo está configurado para você começar a usar o projeto.


## 🚀 Modo de uso

Você pode iniciar o servidor local de desenvolvimento, com o seguinte comando:
```
yarn dev:server
```

# 🔎 Endpoints da API <a name = "endpoints"></a>

## Obter perfil:
```
GET /user/:username
```
Use essa rota para obter informações sobre o perfil de determinado usuário, basta substituir o parâmetro ":username" da rota pelo usuário do github correspondente, você deve receber uma resposta no seguinte modelo:
```json
{
  "github_login": "davigsousa",
  "avatar_url": "https://avatars0.githubusercontent.com/u/40612788?v=4",
  "repositories": [
    {
      "name": "algorithms",
      "full_name": "davigsousa/algorithms",
      "description": "Some useful algorithms (Still learning and updating more).",
      "html_url": "https://github.com/davigsousa/algorithms",
      "created_at": "2020-05-27T14:50:25Z",
      "language": "C++"
    },
    {
      "name": "doeteca",
      "full_name": "davigsousa/doeteca",
      "description": "A Frontend for a Conceptual Project named Doeteca. Online on: https://doeteca.netlify.app/",
      "html_url": "https://github.com/davigsousa/doeteca",
      "created_at": "2020-02-17T22:01:18Z",
      "language": "JavaScript"
    },
  ],
  "top_language": "JavaScript",
  "top_5_languages": [
    "JavaScript",
    "Python",
    "C++",
    "CSS",
    "TypeScript"
  ]
}
```

## Obter relatório do dia atual:
```
GET /user/daily/:username
```
Use essa rota para obter informações de interações de determinado usuário no dia atual, basta substituir o parâmetro ":username" da rota pelo usuário do github correspondente, você deve receber uma resposta no seguinte modelo:
```json
{
  "new_forks": 0,
  "new_issues": 0,
  "new_prs": 4,
  "new_stars": 0,
  "new_repositories": 0,
  "new_interactions": 4,
  "new_commits": 32,
  "commits": [
    {
      "repository": {
        "id": 289791710,
        "name": "Guardians-DSC/GitRadar",
        "url": "https://api.github.com/repos/Guardians-DSC/GitRadar"
      },
      "message": "initial Service structure created"
    },
    {
      "repository": {
        "id": 293942092,
        "name": "davigsousa/GitRadar",
        "url": "https://api.github.com/repos/davigsousa/GitRadar"
      },
      "message": "Merge pull request #1 from davigsousa/develop\n\nCriação da Api e Criação do Profile Service"
    }
  ]
}
```

## Iniciar sessão com a conta de um professor:
```
POST /session
```
Realiza a sessão de um professor na aplicação, para realizar a requisição, deve-se enviar uma chave "email" com o e-mail do professor uma chave "password" com a senha, dessa forma, se recebe como retorno o token JWT para o uso em rotas autenticadas, exemplo de retorno:
```json
{
  "teacher": {
    "id": "7ea79496-c141-487c-a810-522aa949839f",
    "github_login": "davigsousa",
    "name": "Davi Sousa",
    "email": "davi@email.com",
    "avatar_url": "https://avatars0.githubusercontent.com/u/40612788?v=4",
    "github_id": "40612788",
    "created_at": "2020-10-28T04:41:07.360Z",
    "updated_at": "2020-10-28T04:45:26.492Z"
  },
  "token": "tokenJWT",
  "hasGithubToken": true
}
```

## ⭐ A partir daqui, todas as rotas são autenticadas.

## Listar alunos de uma turma:
```
GET /class/
```
Listar todos os alunos da turma da aplicação, exemplo de retorno:
```json
[
  {
    "id": "69615485-8f7c-473e-9099-cce2ce31200d",
    "teacher_id": "7ea79496-c141-487c-a810-522aa949839f",
    "github_login": "natalia-sa",
    "avatar_url": "https://avatars2.githubusercontent.com/u/55745942?v=4",
    "top_language": "Java",
    "github_id": "55745942",
    "name": "Natália Salvino André",
    "created_at": "2020-10-28T04:45:42.499Z",
    "updated_at": "2020-10-28T04:45:42.499Z"
  },
  {
    "id": "15f7c236-075f-454b-be9e-9b8e4a8aa335",
    "teacher_id": "7ea79496-c141-487c-a810-522aa949839f",
    "github_login": "kleberfsobrinho",
    "avatar_url": "https://avatars2.githubusercontent.com/u/56925275?v=4",
    "top_language": "Java",
    "github_id": "56925275",
    "name": null,
    "created_at": "2020-10-28T04:51:31.278Z",
    "updated_at": "2020-10-28T04:51:31.278Z"
  }
]
```

## Listar alunos da turma abaixo da média:
```
GET /class/below_average?since=2020-10-02
```
Informando o parâmetro "since" na query, você informa o início do período de avaliação da média, outro parâmetro opcional na rota é "until" que delimita o final do período. Use essa rota para listar todos os alunos da turma abaixo da média de interações, exemplo de retorno:
```json
[
  {
    "id": "69615485-8f7c-473e-9099-cce2ce31200d",
    "teacher_id": "7ea79496-c141-487c-a810-522aa949839f",
    "github_login": "natalia-sa",
    "avatar_url": "https://avatars2.githubusercontent.com/u/55745942?v=4",
    "top_language": "Java",
    "github_id": "55745942",
    "name": "Natália Salvino André",
    "created_at": "2020-10-28T04:45:42.499Z",
    "updated_at": "2020-10-28T04:45:42.499Z"
  },
  {
    "id": "15f7c236-075f-454b-be9e-9b8e4a8aa335",
    "teacher_id": "7ea79496-c141-487c-a810-522aa949839f",
    "github_login": "kleberfsobrinho",
    "avatar_url": "https://avatars2.githubusercontent.com/u/56925275?v=4",
    "top_language": "Java",
    "github_id": "56925275",
    "name": null,
    "created_at": "2020-10-28T04:51:31.278Z",
    "updated_at": "2020-10-28T04:51:31.278Z"
  }
]
```

## Obter Relatório da Turma:
```
GET /class/report?since=2020-10-02
```
Informando o parâmetro "since" na query, você informa o início do período, outro parâmetro opcional na rota é "until" que delimita o final do período. Use essa rota para obter o relatório de uma turma em um período, exemplo de retorno:
```json
{
  "all_new_interactions": 36,
  "all_new_commits": 29,
  "new_interactions_average": 3,
  "new_commits_average": 2.4166666666666665
}
```

## Adicionar aluno na Turma:
```
POST /student
```
Adiciona-se um aluno na turma, para realizar a requisição, deve-se enviar uma chave "github_login" com o username do aluno no Github, dessa forma, se recebe como retorno o aluno criado, exemplo de retorno:
```json
{
  "teacher_id": "84e5a509-16af-4f3d-805c-c400751e6d4c",
  "github_login": "antoniontv",
  "avatar_url": "https://avatars3.githubusercontent.com/u/38543529?v=4",
  "top_language": "Java",
  "github_id": "38543529",
  "name": "Antonio Bertino de Vasconcelos Cabral Neto ",
  "id": "62085bb4-4a0a-47ca-a470-c43c3cdcc080",
  "created_at": "2020-10-23T08:04:42.903Z",
  "updated_at": "2020-10-23T08:04:42.903Z"
}
```

## Obtém as informações de um aluno:
```
GET /student/:username
```
Obtém as informações de um aluno, deve-se enviar o username do Github do aluno como params :username, é retornado as informações do estudante e seus repositórios:
```json
{
  "student": {
    "id": "f5de7532-0a61-4db1-833c-2513aa5f0dab",
    "teacher_id": "7ea79496-c141-487c-a810-522aa949839f",
    "github_login": "davigsousa",
    "avatar_url": "https://avatars0.githubusercontent.com/u/40612788?v=4",
    "top_language": "JavaScript",
    "github_id": "40612788",
    "name": "Davi Sousa",
    "created_at": "2020-10-28T04:47:35.601Z",
    "updated_at": "2020-10-28T04:47:35.601Z"
  },
  "repositories": [
    {
      "id": "35d0645f-1ace-439d-8349-379a40f5c8a8",
      "student_id": "f5de7532-0a61-4db1-833c-2513aa5f0dab",
      "name": "a-granja-api",
      "full_name": "davigsousa/a-granja-api",
      "description": "API RESTful para servir os dados das votações no Programa \"A Granja\".",
      "html_url": "https://github.com/davigsousa/a-granja-api",
      "github_id": "277945496",
      "created_at": "2020-10-28T04:47:35.864Z",
      "updated_at": "2020-10-28T04:47:35.864Z"
    },
    {
      "id": "fdf99a27-c1c7-4f0b-b55c-eb79eb444f4d",
      "student_id": "f5de7532-0a61-4db1-833c-2513aa5f0dab",
      "name": "viva-web",
      "full_name": "davigsousa/viva-web",
      "description": "Website desenvolvido no Hackathon MegaHack. (Descontinuado)",
      "html_url": "https://github.com/davigsousa/viva-web",
      "github_id": "260795504",
      "created_at": "2020-10-28T04:47:41.821Z",
      "updated_at": "2020-10-28T04:47:41.821Z"
    }
  ]
}
```

## Obtém a quantidade de interações por dia em um período de um estudante:
```
GET /student/:username/interactions/volume?since=2020-11-02
```
Informando o parâmetro "since" na query, você informa o início do período, outro parâmetro opcional na rota é "until" que delimita o final do período. Obtém a quantidade de interações por dia de um aluno, deve-se enviar o username do Github do aluno como params :username, as quantidades são retornadas no seguinte modelo:
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

## Obtém a adição e remoção de linhas por dia em um período de um estudante:
```
GET /student/:username/lines/volume?since=2020-11-02
```
Informando o parâmetro "since" na query, você informa o início do período, outro parâmetro opcional na rota é "until" que delimita o final do período. Obtém a quantidade adições e remoções de linhas de código por dia de um aluno, deve-se enviar o username do Github do aluno como params :username, as quantidades são retornadas no seguinte modelo:
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

## Obter Relatório de um estudante:
```
GET /student/:username/report?since=2020-10-02
```
Informando o parâmetro "since" na query, você informa o início do período, outro parâmetro opcional na rota é "until" que delimita o final do período. Use essa rota para obter o relatório de um estudante em um período, exemplo de retorno:
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

## Adicionar professor na aplicação:
```
POST /teacher
```
Adiciona-se um professor na aplicação, para realizar a requisição, deve-se enviar uma chave "github_login" com o username do professor no Github, uma chave "email" com o e-mail do professor e uma chave "password" no body da requisição, dessa forma, se recebe como retorno o professor criado, exemplo de retorno:
```json
{
  "github_login": "davigsousa",
  "name": "Davi Sousa",
  "email": "davi.gomes.sousa@ccc.ufcg.edu.br",
  "avatar_url": "https://avatars0.githubusercontent.com/u/40612788?v=4",
  "github_id": "40612788",
  "id": "84e5a509-16af-4f3d-805c-c400751e6d4c",
  "created_at": "2020-10-15T21:52:19.772Z",
  "updated_at": "2020-10-15T21:52:19.772Z"
}
```
