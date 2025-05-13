# belp-o

## Diagrama de arquitetura

````mermaid
flowchart LR
  app["Aplicativo Mobile"] --> microservice["API"]
  microservice --> database(MySQL)
````


# 📱 Componente de Login - React Native

Este componente implementa uma tela de login com autenticação via API, utilizando `AsyncStorage` para armazenar o token localmente. Caso o usuário já esteja autenticado, o conteúdo filho é exibido. Caso contrário, o formulário de login é apresentado.

## ✨ Funcionalidades

- Autenticação via API (`getToken`)
- Armazenamento do token com `@react-native-async-storage/async-storage`
- Redirecionamento automático se o token já estiver salvo
- Interface moderna com `react-native-paper`
- Link para cadastro de novos usuários

## 📦 Dependências

Certifique-se de ter as seguintes bibliotecas instaladas:

```bash
npm install @react-native-async-storage/async-storage react-native-paper react-router-native

src/
├── api/
│   └── index.js         # Contém a função getToken()
├── components/
│   └── Login.js         # Este componente
assets/
└── fundo.jpeg           # Imagem de fundo usada no topo



