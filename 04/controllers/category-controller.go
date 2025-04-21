package controllers

import (
	"task_04/models"

	"net/http"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type CategoryController struct {
	DB *gorm.DB
}

func NewCategoryController(db *gorm.DB) *CategoryController {
	return &CategoryController{DB: db}
}

func (cc *CategoryController) CreateCategory(c echo.Context) error {
	var category models.Category

	if err := c.Bind(&category); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid input"})
	}

	if err := cc.DB.Create(&category).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create category"})
	}

	return c.JSON(http.StatusCreated, category)
}

func (cc *CategoryController) GetAllCategories(c echo.Context) error {
	var categories []models.Category

	if err := cc.DB.Find(&categories).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch categories"})
	}

	return c.JSON(http.StatusOK, categories)
}

