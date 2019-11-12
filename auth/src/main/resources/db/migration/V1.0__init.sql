-- noinspection SpellCheckingInspectionForFile
CREATE DATABASE IF NOT EXISTS oauth_db;
USE oauth_db;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `oauth_client_details`;
CREATE TABLE `oauth_client_details` (
  `client_id` varchar(255) NOT NULL,
  `resource_ids` varchar(255) DEFAULT NULL,
  `client_secret` varchar(255) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `authorized_grant_types` varchar(255) DEFAULT NULL,
  `web_server_redirect_uri` varchar(255) DEFAULT NULL,
  `authorities` varchar(255) DEFAULT NULL,
  `access_token_validity` int(11) DEFAULT NULL,
  `refresh_token_validity` int(11) DEFAULT NULL,
  `additional_information` varchar(4096) DEFAULT NULL,
  `autoapprove` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


drop table if exists oauth_client_token;
create table oauth_client_token
(
  token_id          VARCHAR(255),
  token             MEDIUMBLOB,
  authentication_id VARCHAR(255) PRIMARY KEY,
  user_name         VARCHAR(255),
  client_id         VARCHAR(255)
);

drop table if exists oauth_access_token;
create table oauth_access_token
(
  token_id          VARCHAR(255),
  token             MEDIUMBLOB,
  authentication_id VARCHAR(255) PRIMARY KEY,
  user_name         VARCHAR(255),
  client_id         VARCHAR(255),
  authentication    MEDIUMBLOB,
  refresh_token     VARCHAR(255)
);

drop table if exists oauth_refresh_token;
create table oauth_refresh_token
(
  token_id       VARCHAR(255),
  token          MEDIUMBLOB,
  authentication MEDIUMBLOB
);

drop table if exists oauth_code;
create table oauth_code
(
  code           VARCHAR(255),
  authentication MEDIUMBLOB
);

drop table if exists oauth_approvals;
create table oauth_approvals
(
  userId         VARCHAR(255),
  clientId       VARCHAR(255),
  scope          VARCHAR(255),
  status         VARCHAR(10),
  expiresAt      TIMESTAMP,
  lastModifiedAt TIMESTAMP
);


LOCK TABLES `oauth_client_details` WRITE;
INSERT INTO `oauth_client_details`
VALUES ('test', 'ms/authorization', '{bcrypt}$2y$10$xLA8Tyrkj3NZXFBFy1hnReB01Q/Zm2RKHexqLmeM.cvP8kMylYLpu',
        'ROLE_ADMIN,ROLE_USER', 'password,refresh_token', NULL,
        'ROLE_ADMIN,ROLE_USER', 2600000, 5200000, '{}', NULL),
        ('test2', 'ms/authorization', '{bcrypt}$2y$10$xLA8Tyrkj3NZXFBFy1hnReB01Q/Zm2RKHexqLmeM.cvP8kMylYLpu',
        'ROLE_USER', 'authorization_code', 'http://localhost:8081/',
        'ROLE_USER', 2600000, 5200000, '{}', true);
UNLOCK TABLES;


DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `version` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;


LOCK TABLES `permission` WRITE;
INSERT INTO `permission`
VALUES (1, 'CAN_DELETE_USER', NOW(), NOW(), 0),
       (2, 'CAN_CREATE_USER', NOW(), NOW(), 0),
       (3, 'CAN_UPDATE_USER', NOW(), NOW(), 0),
       (4, 'CAN_READ_USER', NOW(), NOW(), 0);
UNLOCK TABLES;

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `version` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


LOCK TABLES `role` WRITE;
INSERT INTO `role`
VALUES (1, 'ROLE_ADMIN', NOW(), NOW(), 0),
       (2, 'ROLE_USER', NOW(), NOW(), 0),
       (3, 'ROLE_SUPER_ADMIN', NOW(), NOW(), 0);
UNLOCK TABLES;


DROP TABLE IF EXISTS `permission_user`;
CREATE TABLE `permission_user` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `version` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`permission_id`,`user_id`),
  KEY `permission_user_fk2` (`user_id`),
  CONSTRAINT `permission_user_fk1` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permission_user_fk2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


LOCK TABLES `permission_user` WRITE;
INSERT INTO `permission_user` VALUES (1,1,NOW(),NOW(),0),(2,1,NOW(),NOW(),0),(3,1,NOW(),NOW(),0),(4,1,NOW(),NOW(),0);
UNLOCK TABLES;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(24) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  name varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `account_expired` bit(1) NOT NULL,
  `credentials_expired` bit(1) NOT NULL,
  `account_locked` bit(1) NOT NULL,
  role_id bigint(20) unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `version` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `role_user_fk` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY `user_ix1` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


INSERT INTO `user`
VALUES (1, 'admin', '{bcrypt}$2y$10$JgYLZ4eEZLEkFZD9zLf6SOMnJGb7UtcZGIPSeD8iQDaiR.KQeXrkW', 'contact@admin.fr', 'Administrateur', 1,
        '\0', '\0', '\0', 1, NOW(), NOW(), 0);

SET FOREIGN_KEY_CHECKS=1;