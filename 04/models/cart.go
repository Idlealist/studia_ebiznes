package models

type Cart struct {
	ID        uint       `gorm:"primaryKey" json:"id"`
	UserID    uint       `json:"user_id"`
	Items     []CartItem `gorm:"foreignKey:CartID"`
}

type CartItem struct {
	ID        uint    `gorm:"primaryKey" json:"id"`
	CartID    uint    `json:"cart_id"`
	ProductID uint    `json:"product_id"`
	Product   Product `gorm:"foreignKey:ProductID"`
	Quantity  int     `json:"quantity"`
}