CREATE TABLE `article`  (
  `sku` int NOT NULL,
  `article_name` varchar(15) NOT NULL,
  `brand` varchar(15) NOT NULL,
  `model` varchar(20) NOT NULL,
  `department` tinyint(1) NOT NULL,
  `class_id` tinyint NOT NULL,
  `family_id` smallint NOT NULL,
  `stock` int NOT NULL,
  `amount` int NOT NULL,
  `discontinued` tinyint(1) NOT NULL,
  `created_at` date NOT NULL DEFAULT '',
  `deleted_ad` date NOT NULL,
  PRIMARY KEY (`sku`)
);

CREATE TABLE `class`  (
  `class_id` tinyint NOT NULL,
  `class_name` varchar(150) NOT NULL,
  `created_at` date NOT NULL,
  `deleted_at` date NOT NULL,
  PRIMARY KEY (`class_id`)
);

CREATE TABLE `family`  (
  `family_id` smallint NOT NULL,
  `family_name` varchar(150) NOT NULL,
  `created_at` date NOT NULL,
  `deleted_at` date NOT NULL,
  PRIMARY KEY (`family_id`)
);

ALTER TABLE `article` ADD CONSTRAINT `fk_article_class_id` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE `article` ADD CONSTRAINT `fk_article_family_id` FOREIGN KEY (`family_id`) REFERENCES `family` (`family_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

