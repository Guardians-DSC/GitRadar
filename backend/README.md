## 🏁 Iniciando <a name = "iniciando"></a>

Você pode clonar o respositório com o git, com o seguinte comando:
```
git clone https://github.com/Guardians-DSC/GitRadar.git
```

### Pré-requisitos

Você precisará de NodeJS e Yarn (para facilitar o processo) no seu computador. <br>
- [NodeJS](https://nodejs.org/en/download/) <br>
- [Yarn](https://yarnpkg.com/getting-started/install)

### Instalando

No terminal, abra a pasta do projeto.
```
cd GitRadar
```
Então, digite:
```
yarn
```
Pronto! Tudo está configurado para você começar a usar o projeto.


## 🚀 Modo de uso <a name = "uso"></a>

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
