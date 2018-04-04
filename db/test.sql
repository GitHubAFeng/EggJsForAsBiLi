/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-04-04 14:32:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for wepy_list
-- ----------------------------
DROP TABLE IF EXISTS `wepy_list`;
CREATE TABLE `wepy_list` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tname` varchar(50) DEFAULT NULL COMMENT '分类名字',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `pic` varchar(255) DEFAULT NULL COMMENT '封面图',
  `ctime` int(11) DEFAULT '0' COMMENT '创建时间',
  `desc` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '描述',
  `is_delete` tinyint(1) unsigned DEFAULT '0' COMMENT '是否删除',
  `aid` int(11) NOT NULL DEFAULT '0' COMMENT 'avid',
  `type` varchar(20) DEFAULT NULL COMMENT '视频类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2282 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for wepy_list_draw
-- ----------------------------
DROP TABLE IF EXISTS `wepy_list_draw`;
CREATE TABLE `wepy_list_draw` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `img_src` varchar(255) DEFAULT NULL COMMENT '封面图',
  `upload_time` int(11) DEFAULT '0' COMMENT '创建时间',
  `is_delete` tinyint(1) unsigned DEFAULT '0' COMMENT '是否删除',
  `doc_id` int(11) DEFAULT '0' COMMENT '详情页ID',
  `uid` int(11) DEFAULT '0' COMMENT '用户ID',
  `img_width` int(11) DEFAULT '0' COMMENT '图片宽度',
  `img_height` int(11) DEFAULT '0' COMMENT '图片高度',
  `img_size` int(11) DEFAULT '0' COMMENT '图片大小',
  `type` varchar(20) DEFAULT NULL COMMENT '类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='B站绘画列表';

-- ----------------------------
-- Table structure for wepy_user
-- ----------------------------
DROP TABLE IF EXISTS `wepy_user`;
CREATE TABLE `wepy_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT '0',
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `head_url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '头像',
  `expire_time` int(11) DEFAULT '0' COMMENT 'token过期时间（Unix时间戳）',
  `is_delete` int(11) DEFAULT '0' COMMENT '是否删除',
  `type` varchar(20) DEFAULT NULL COMMENT '类型',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
