#!/bin/bash

URL="http://localhost:8080"

echo -e "\n POST /categories"
curl -s -X POST "$URL/categories" \
  -H "Content-Type: application/json" \
  -d '{"name":"Electronics","description":"Test description"}' | jq .

echo -e "\n POST /products "
curl -s -X POST "$URL/products" \
  -H "Content-Type: application/json" \
  -d '{"name":"Smartphone","description":"Test description","price":699.99,"category_id":1}' | jq .

echo -e "\n GET /products "
curl -s -X GET "$URL/products" | jq .

echo -e "\n GET /products/1 "
curl -s -X GET "$URL/products/1" | jq .

echo -e "\n PUT /products/1 "
curl -s -X PUT "$URL/products/1" \
  -H "Content-Type: application/json" \
  -d '{"name":"Smartphone Pro","description":"Test description","price":799.99,"category_id":1}' | jq .

echo -e "\n DELETE /products/1 "
curl -s -X DELETE "$URL/products/1" | jq .

echo -e "\n GET /products "
curl -s -X GET "$URL/products" | jq .

echo -e "\n POST /carts "
curl -s -X POST "$URL/carts" \
  -H "Content-Type: application/json" \
  -d '{"user_id": 132}' | jq .

echo -e "\n POST /products "
curl -s -X POST "$URL/products" \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"Test description","price":1299.99,"category_id":1}' > /dev/null

echo -e "\n POST /cart "
curl -s -X POST "$URL/cart" \
  -H "Content-Type: application/json" \
  -d '{"cart_id":1,"product_id":2,"quantity":2}' | jq .

echo -e "\n GET /cart/1 "
curl -s -X GET "$URL/cart/1" | jq .
