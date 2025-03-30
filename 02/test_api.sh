#!/bin/bash
BASE_URL="http://localhost:9000/products"

echo "===ProductController==="
echo ""

echo "GET"
curl -s -X GET "$BASE_URL" | jq .
echo ""

echo "POST"
curl -s -X POST "$BASE_URL" \
     -H "Content-Type: application/json" \
     -d '{"id": 3, "name": "Tablet", "price": 1500, "category": 1}' | jq .
echo ""

echo "GET"
curl -s -X GET "$BASE_URL/3" | jq .
echo ""

echo "PUT ID 3"
curl -s -X PUT "$BASE_URL/3" \
     -H "Content-Type: application/json" \
     -d '{"id": 3, "name": "Smartwatch", "price": 800, "category": 1}' | jq .
echo ""

echo "GET ID 3"
curl -s -X GET "$BASE_URL/3" | jq .
echo ""

echo "DEL ID 3"
curl -s -X DELETE "$BASE_URL/3"
echo ""

echo "GET"
curl -s -X GET "$BASE_URL" | jq .
echo ""

BASE_URL="http://localhost:9000/categories"

echo "===CategoryController==="
echo ""

echo "GET"
curl -s -X GET "$BASE_URL" | jq .
echo ""

echo "POST"
curl -s -X POST "$BASE_URL" \
     -H "Content-Type: application/json" \
     -d '{"id": 3, "name": "Books"}' | jq .
echo ""

echo "GET ID 3"
curl -s -X GET "$BASE_URL/3" | jq .
echo ""

echo "pUT ID 3"
curl -s -X PUT "$BASE_URL/3" \
     -H "Content-Type: application/json" \
     -d '{"id": 3, "name": "E-Books"}' | jq .
echo ""

echo "GET ID 3"
curl -s -X GET "$BASE_URL/3" | jq .
echo ""

echo "DEL ID 3"
curl -s -X DELETE "$BASE_URL/3"
echo ""

echo "GET"
curl -s -X GET "$BASE_URL" | jq .
echo ""

BASE_URL="http://localhost:9000/cart"

echo "===CartController==="
echo ""

echo "GET empty"
curl -s -X GET "$BASE_URL" | jq .
echo ""

echo "POST"
curl -s -X POST "$BASE_URL" \
     -H "Content-Type: application/json" \
     -d '{"id": 1, "productId": 1, "quantity": 2}' | jq .
echo ""

echo "GET"
curl -s -X GET "$BASE_URL" | jq .
echo ""

echo "PUT ID 1"
curl -s -X PUT "$BASE_URL/1" \
     -H "Content-Type: application/json" \
     -d '{"id": 1, "productId": 1, "quantity": 5}' | jq .
echo ""

echo "GET"
curl -s -X GET "$BASE_URL" | jq .
echo ""

echo "DEL"
curl -s -X DELETE "$BASE_URL/1"
echo ""

echo "GET empty"
curl -s -X GET "$BASE_URL" | jq .
echo ""

