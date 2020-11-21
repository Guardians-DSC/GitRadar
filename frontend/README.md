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

No terminal, abra a pasta do projeto e do Frontend.

```
cd GitRadar/frontend
```

Então, digite:

```
yarn
```

Agora, precisamos configurar as variáveis de ambiente. Para isso, você deve copiar o arquivo ".env.sample" e
o renomear para ".env" na pasta raiz do Backend. Você precisa preencher os valores de todas as variáveis de acordo com o seu significado.
<br>
Segue o arquivo ".env" comentado:

```bash
# Informações do Aplicativo OAuth do GitHub
REACT_APP_CLIENT_ID=your_client_id # Mesmo valor do ClientID obtido na configuração do Backend, consulte o README do Backend.
```

Pronto! Tudo está configurado para você começar a usar o projeto.

## 🚀 Modo de uso

Você pode iniciar o servidor local de desenvolvimento, com o seguinte comando:

```
yarn start
```

Pronto, o servidor estará sendo executado em http://localhost:3000!
