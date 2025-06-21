-- Inicializando o banco de dados
USE belpao;

CREATE TABLE `usuario` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `senha` VARCHAR(255) NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(20) NOT NULL UNIQUE,
  `perfil` ENUM('adm', 'cliente') NOT NULL DEFAULT 'cliente'
);

CREATE TABLE `endereco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` INT DEFAULT NULL,
  `rua` varchar(255) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `estado` varchar(10) NOT NULL,
  `cep` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario` (`usuario`),
  CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
);

CREATE TABLE `produto` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT DEFAULT NULL,
  `categoria` VARCHAR(150) NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `descricao` TEXT NOT NULL,
  `preco` DECIMAL(10, 2) NOT NULL,
  `imagem` LONGBLOB,
);

CREATE TABLE `pedido` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `usuario` INT DEFAULT NULL,
  `endereco` INT DEFAULT NULL,
  `tipo_pagamento` ENUM('dinheiro', 'pix', 'credito', 'debito', 'ticket') NOT NULL DEFAULT 'dinheiro',
  `data_pedido` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('criado', 'confirmado', 'cancelado', 'concluido') NOT NULL DEFAULT 'criado',
  KEY `usuario` (`usuario`),
  KEY `endereco` (`endereco`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`endereco`) REFERENCES `endereco` (`id`) ON DELETE CASCADE
);

CREATE TABLE `pedido_produtos` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `pedido` int DEFAULT NULL,
  `produto` int DEFAULT NULL,
  `quantidade` int NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `pedido` (`pedido`),
  KEY `produto` (`produto`),
  CONSTRAINT `pedido_produtos_ibfk_1` FOREIGN KEY (`pedido`) REFERENCES `pedido` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pedido_produtos_ibfk_2` FOREIGN KEY (`produto`) REFERENCES `produto` (`id`) ON DELETE CASCADE
);
