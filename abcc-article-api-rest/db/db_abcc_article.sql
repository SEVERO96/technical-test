create database db_abcc_article; 
USE db_abcc_article;


-- Table structure for class
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `id` tinyint(2) NOT NULL,
  `class_name` varchar(150) NOT NULL,
  `created_at` date NULL,
  `deleted_at` date NULL,
  CONSTRAINT `pk_class_id` PRIMARY KEY (`id`)
)ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish2_ci ROW_FORMAT = Dynamic;

-- add register for class
INSERT INTO class(id, class_name) VALUES 
 (1, 'complemento para la sala');
 INSERT INTO class(id, class_name) VALUES 
 (2, 'smartphone');
 INSERT INTO class(id, class_name) VALUES 
 (3, 'calzado');



-- Table structure for family
DROP TABLE IF EXISTS `family`;
CREATE TABLE `family`  (
  `id` smallint(3) NOT NULL,
  `family_name` varchar(150) NOT NULL,
  `created_at` date NULL,
  `deleted_at` date NULL,
  CONSTRAINT `pk_family_id` PRIMARY KEY (`id`)
)ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish2_ci ROW_FORMAT = Dynamic;

-- add register for family
INSERT INTO family(id, family_name) VALUES 
 (1, 'television 4k');
 INSERT INTO family(id, family_name) VALUES 
 (2, 'telefono marca Apple');
 INSERT INTO family(id, family_name) VALUES 
 (3, 'Sillon individual');
  INSERT INTO family(id, family_name) VALUES 
 (4, 'Tenis de baskeball');


 -- Table structure for department
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `id` tinyint(1) NOT NULL,
  `department_name` varchar(150) NOT NULL,
  `created_at` date NULL,
  `deleted_at` date NULL,
  CONSTRAINT `pk_department_id` PRIMARY KEY (`id`)
)ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish2_ci ROW_FORMAT = Dynamic;

-- add register for department
INSERT INTO department(id, department_name) VALUES 
 (1, 'Electrodomesticos');
 INSERT INTO department(id, department_name) VALUES 
 (2, 'Ropa');
 INSERT INTO department(id, department_name) VALUES 
 (3, 'Telefonia');
  INSERT INTO department(id, department_name) VALUES 
 (4, 'Zapateria');
  INSERT INTO department(id, department_name) VALUES 
 (5, 'Muebleria');
 
 -- Table structure for article
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `sku` int(6) NOT NULL,
  `article_name` varchar(15) NOT NULL,
  `brand` varchar(15) NOT NULL,
  `model` varchar(20) NOT NULL,
  `department_id` tinyint(1) NOT NULL,
  `class_id` tinyint(2) NOT NULL,
  `family_id` smallint(3) NOT NULL,
  `stock` int(9) NOT NULL,
  `amount` int(9) NOT NULL,
  `discontinued` tinyint(1) NOT NULL,
  `created_at` date NULL,
  `deleted_at` date NULL,
  CONSTRAINT `pk_article_id` PRIMARY KEY (`sku`),
  CONSTRAINT `fk_article_class_id` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_family_id` FOREIGN KEY (`family_id`) REFERENCES `family` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_article_department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish2_ci ROW_FORMAT = Dynamic;

-- add registrer catalogue
INSERT INTO article(sku, article_name, brand, model, department_id, class_id, family_id, stock, amount, discontinued,created_at,deleted_at) VALUES 
 (11111, 'Television', 'samsung', 'tr453', 1, 1, 1, 12, 8,0,"2022-11-07","1900-01-01");
 INSERT INTO article(sku, article_name, brand, model, department_id, class_id, family_id, stock, amount, discontinued,created_at,deleted_at) VALUES 
 (222222, 'sillon', 'Turu', 'sl1234', 5,1, 3, 14, 5,1,'2022-11-07','1900-01-01');
 INSERT INTO article(sku, article_name, brand, model, department_id, class_id, family_id, stock, amount, discontinued,created_at,deleted_at) VALUES 
 (444444, 'IPHONE 11', 'Apple', 'app1120', 3, 2, 2, 10, 5,0,"2022-11-07","1900-01-01");
 INSERT INTO article(sku, article_name, brand, model, department_id, class_id, family_id, stock, amount, discontinued,created_at,deleted_at) VALUES 
 (333333, 'TENIS NIKE', 'zapateria', 'tnn123', 4,3, 4, 12, 2,0,"2022-11-07","1900-01-01");