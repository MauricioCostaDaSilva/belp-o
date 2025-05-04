# belp-o

## Diagrama de arquitetura

````mermaid
flowchart LR
  app["Aplicativo Mobile"] --> microservice["API"]
  microservice --> database(MySQL)
````

## 📦 App de Entregas da Padaria

Um aplicativo de delivery feito especialmente para pequenas padarias alcançarem mais clientes e facilitarem o processo de vendas.

## ✨Funcionalidades

- [ ] Cadastro de produtos (pães, bolos, salgados, etc.)

- [ ]  Carrinho de compras

- [ ]  Finalização de pedido com endereço de entrega

- [ ]  Notificações de pedido recebido

- [ ]  Painel para a padaria acompanhar os pedidos

## 🛠️Tecnologias usadas

- Front-end:  React Native

- Back-end:  Node.js

- Banco de dados:PostgreSQL

- API de mapas: Google Maps API para endereço

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```


