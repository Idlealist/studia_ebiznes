package models

import "gorm.io/gorm"

func ActiveProducts(db *gorm.DB) *gorm.DB {
	return db.Where("price >= ?", 0)
}

func WithCategory(db *gorm.DB) *gorm.DB {
	return db.Preload("Category")
}