package controllers

import (
	"task_04/models"

	"net/http"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type ProductController struct {
	DB *gorm.DB
}

func NewProductController(db *gorm.DB) *ProductController {
	return &ProductController{DB: db}
}

func (pc *ProductController) Create(c echo.Context) error {
	var product models.Product

	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid input"})
	}

	if err := pc.DB.Create(&product).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create product"})
	}

	if err := pc.DB.Scopes(models.WithCategory).First(&product, product.ID).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to load category"})
	}

	return c.JSON(http.StatusCreated, product)
}

func (pc *ProductController) GetAll(c echo.Context) error {
	var products []models.Product

	if err := pc.DB.Scopes(models.ActiveProducts, models.WithCategory).Find(&products).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to get products"})
	}

	return c.JSON(http.StatusOK, products)
}

func (pc *ProductController) GetByID(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	if err := pc.DB.Scopes(models.WithCategory).First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	return c.JSON(http.StatusOK, product)
}

func (pc *ProductController) Update(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	if err := pc.DB.Preload("Category").First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	if err := pc.DB.Save(&product).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update product"})
	}

	return c.JSON(http.StatusOK, product)
}

func (pc *ProductController) Delete(c echo.Context) error {
	id := c.Param("id")

	if err := pc.DB.Delete(&models.Product{}, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	return c.NoContent(http.StatusNoContent)
}