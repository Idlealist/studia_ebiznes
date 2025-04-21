package main

import (
	"task_04/controllers"
	"task_04/models"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("task_04.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&models.Category{}, &models.Product{}, &models.Cart{}, &models.CartItem{})

	e := echo.New()

	pc := controllers.NewProductController(db)
	cc := controllers.NewCartController(db)
	catc := controllers.NewCategoryController(db)

	e.POST("/products", pc.Create)
	e.GET("/products", pc.GetAll)
	e.GET("/products/:id", pc.GetByID)
	e.PUT("/products/:id", pc.Update)
	e.DELETE("/products/:id", pc.Delete)

	e.POST("/categories", catc.CreateCategory)
	e.GET("/categories", catc.GetAllCategories)

	e.POST("/carts", cc.CreateCart)

	e.POST("/cart", cc.AddToCart)
	e.GET("/cart/:id", cc.GetCart)

	e.Logger.Fatal(e.Start(":8080"))
}