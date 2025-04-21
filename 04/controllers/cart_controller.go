package controllers

import (
	"task_04/models"
	"net/http"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type CartController struct {
	DB *gorm.DB
}

func NewCartController(db *gorm.DB) *CartController {
	return &CartController{DB: db}
}

func (cc *CartController) CreateCart(c echo.Context) error {
	var cart models.Cart

	if err := c.Bind(&cart); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid input"})
	}

	if err := cc.DB.Create(&cart).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create cart"})
	}

	return c.JSON(http.StatusCreated, cart)
}


func (cc *CartController) AddToCart(c echo.Context) error {
	var cartItem struct {
		CartID    uint `json:"cart_id"`
		ProductID uint `json:"product_id"`
		Quantity  int  `json:"quantity"`
	}
	
	if err := c.Bind(&cartItem); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid input"})
	}

	item := models.CartItem{
		CartID:    cartItem.CartID,
		ProductID: cartItem.ProductID,
		Quantity:  cartItem.Quantity,
	}

	if err := cc.DB.Create(&item).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to add to cart"})
	}

	return c.JSON(http.StatusCreated, item)
}

func (cc *CartController) GetCart(c echo.Context) error {
	id := c.Param("id")
	var cart models.Cart

	if err := cc.DB.Preload("Items.Product").Scopes(models.WithCategory).First(&cart, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Cart not found"})
	}

	return c.JSON(http.StatusOK, cart)
}