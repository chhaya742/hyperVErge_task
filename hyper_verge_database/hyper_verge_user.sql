CREATE DATABASE  IF NOT EXISTS `hyper_verge` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hyper_verge`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: hyper_verge
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL DEFAULT '1',
  `password` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Profile_pic` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_unique` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'chhaya','indore','chhaya@gmail.com','2','Chhaya@123','8765456765','','2024-01-31 15:39:49','2024-02-02 20:42:50'),(3,'maya','indore','maya@gmail.com','1','$2b$12$71cruLRYV7fv9Vlct5o0Dux0w.U.W8.Bm6psdg1OtXRPiUpND1OXa','9876543234','/uploads/Screenshot (16).png','2024-01-31 15:47:31','2024-02-05 00:03:19'),(4,'neha33','indore','neha22@gmail.ocm','1','Chhaya@123','3432','','2024-01-31 15:50:19','2024-02-02 22:48:33'),(5,'riya','indore','riya@gmail.com','1','Chhaya@123','3242','','2024-01-31 15:52:13','2024-02-03 21:09:25'),(7,'riya','indore','riya4@gmail.com','1','Chhaya@123','3242','','2024-01-31 15:52:32','2024-01-31 15:52:32'),(8,'sakshi','indore','sakshi@gmail.com','1','Chhaya@123','8765456765','','2024-01-31 15:58:21','2024-01-31 15:58:21'),(10,'sakshi','indore','sakshi1@gmail.com','1','Chhaya@123','8765456765','','2024-01-31 16:00:27','2024-01-31 16:00:27'),(11,'sakshi','indore','sakshi11@gmail.com','1','Chhaya@123','8765456765','','2024-01-31 16:00:57','2024-01-31 16:00:57'),(12,'sakshi','indore','sakshi11i@gmail.com','1','Chhaya@123','8765456765','','2024-01-31 16:01:43','2024-01-31 16:01:43'),(14,'sakshi','indore','sakshi1511i@gmail.com','1','Chhaya@123','8765456765','','2024-01-31 16:02:43','2024-01-31 16:02:43'),(15,'tina','indore','tina@gmail.com','1','Chhaya@123','345678765','','2024-01-31 16:05:00','2024-01-31 16:05:00'),(16,'kittu','indore','kittu@gmail.com','1','Chhaya@123','9876567876','','2024-01-31 20:41:34','2024-01-31 20:41:34'),(17,'neha','chhaya@gmail.com','maya11@gmail.com','1','Chhaya@123','8765456765','','2024-01-31 20:45:28','2024-01-31 20:45:28'),(18,'neha','chhay','neha224@gmail.ocm','1','Chhaya@123','8765456765','C:\\fakepath\\Screenshot (2).png','2024-01-31 20:46:26','2024-01-31 20:46:26'),(19,'maya','chhaya@gmail.com','maya55@gmail.com','1','Chhaya@123','8765456765','C:\\fakepath\\Screenshot (1).png','2024-01-31 20:48:21','2024-01-31 20:48:21'),(21,'kittu','indore','kittu1@gmail.com','1','Chhaya@123','9876567876','','2024-01-31 21:48:02','2024-01-31 21:48:02'),(23,'kittu','indore','kittu12@gmail.com','1','Chhaya@123','9876567876','','2024-01-31 21:49:07','2024-01-31 21:49:07'),(25,'kittu','indore','kittu162@gmail.com','1','Chhaya@123','9876567876','','2024-01-31 22:06:16','2024-01-31 22:06:16'),(27,'kittu','indore','kittu1762@gmail.com','1','Chhaya@123','9876567876','','2024-01-31 22:06:50','2024-01-31 22:06:50'),(28,'kittu','indore','kittu15762@gmail.com','1','Chhaya@123','9876567876','','2024-02-02 12:47:48','2024-02-02 12:47:48'),(30,'kittu','indore','kittu145762@gmail.com','1','Chhaya@123','9876567876','','2024-02-03 09:17:00','2024-02-03 09:17:00'),(32,'kittu','indore','kittu1455762@gmail.com','1','Chhaya@123','9876567876','','2024-02-03 09:17:34','2024-02-03 09:17:34'),(37,'kittu','indore','kittu14455762@gmail.com','1','Chhaya@123','9876567876','','2024-02-03 09:20:31','2024-02-03 09:20:31'),(39,'kittu','indore','kittu194455762@gmail.com','1','$2b$12$25/skNMsKiO1SFxFipOnQ.mYTuft0uZCnSHDXhYEcWkq9hM5bqr2.','9876567876','Screenshot (2).png','2024-02-03 09:21:56','2024-02-03 09:21:56'),(40,'swati','indore','swati@gmail.com','1','$2b$12$03A9q.HA.Bous4ahkBhYb.8Uv6it3zgfhevmmxDef316IwAhFTz5y','987654','Screenshot (7).png','2024-02-03 09:31:52','2024-02-03 09:53:57'),(43,'kittu','indore','kittu4194455762@gmail.com','1','Chhaya@123','9876567876','','2024-02-03 23:20:00','2024-02-03 23:20:00'),(47,'kittu','indore','kittu41944655762@gmail.com','1','$2b$12$5OE95x9IXXuDRM7STPq6KObQdK5OLBVtKukLTUQxpMP2ouIs5V0CS','9876567876','','2024-02-03 23:43:48','2024-02-03 23:43:48'),(48,'kittu','indore','kittu419445655762@gmail.com','1','$2b$12$Cbth6eDscNvZrNrc7cFXLO3938NV0Hbd9oh1oNFhiuc9yzMg8WGF.','9876567876','','2024-02-03 23:44:13','2024-02-03 23:44:13'),(50,'kittu','indore','kittu4194rr45655762@gmail.com','1','$2b$12$bJDS614hqfjDd0oMLsm.v.pjenOp1vm/W.x/L7Q6xxxNRFr2UKcHq','9876567876','','2024-02-03 23:45:27','2024-02-03 23:45:27'),(53,'maya','indore','maya6666@gmail.com','1','$2b$12$OZDnD0avlfnhNRyEe.elxuay07nPmGNrCjZK2twvge8SzJMKDkzL6','9876543234',NULL,'2024-02-05 00:06:56','2024-02-05 00:06:56'),(54,'soniya','indore','soniya@gmail.com','1','$2b$12$WFEpI/WPymRktFmDoYKYhe5k30ADZxTb0yguF/U5rOtd9VlbDAtxO','8765456765',NULL,'2024-02-05 14:47:05','2024-02-05 14:47:05'),(58,'soniya','indore','soniya3@gmail.com','1','$2b$12$nTk.Jshqb/9pPtEWbFnYu.DNqOTkIwNixWzsaWqEnrj5PSW4wazQ6','8765456765',NULL,'2024-02-05 15:05:35','2024-02-05 15:05:35'),(59,'fdcdf','sdfs','dsf@gmail.com','1','$2b$12$SWZOG7FABw3Q93InxhvPxeKC7x9bfb07wGhp7wZgcWU0YMxAvP5Ti','8765456765',NULL,'2024-02-05 15:08:29','2024-02-05 15:08:29'),(62,'asdfg','indpf','csahdhsd@gmail.com','1','$2b$12$HAB/wzjdVkAImaiIJFbJl.cGhAXTUPnArq3QSBCci8jdLBP1XGrQK','8765456765',NULL,'2024-02-05 15:13:33','2024-02-05 15:13:33'),(68,'neha','chhay','neha2245@gmail.ocm','1','$2b$12$g2rinfIfHTpf2WokNZsHeOezE/WGcZa2JD8t3VaNdmWGdy1oxhwtK','8765456765',NULL,'2024-02-05 15:18:33','2024-02-05 15:18:33'),(70,'neha','chhay','neha22455@gmail.ocm','1','$2b$12$fXZjnhAEvYch1ChEVH0g.uEQU.gOylDlAsQm.D/lzoyqWZo.AWP7a','8765456765',NULL,'2024-02-05 15:30:40','2024-02-05 15:30:40'),(71,'neha','chhay','neha22455555@gmail.ocm','1','$2b$12$hryC/1iR8zt3bHV0wvzvKutW9TyOGfQzH1imfsd2eeaJTpTpllnXu','8765456765',NULL,'2024-02-05 15:30:53','2024-02-05 15:30:53'),(73,'neha','chhay','neha77@gmail.ocm','1','$2b$12$9YEIMxkK9wM2maRuIPi2.elC.uYZHDinTbz4QSb6cXPmfVGTgplvu','8765456765',NULL,'2024-02-05 15:33:03','2024-02-05 15:33:03');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-06 10:18:09
