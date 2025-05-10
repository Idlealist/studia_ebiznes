package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestProductsEndpoint(t *testing.T) {
	t.Run("GET /products returns list", func(t *testing.T) {
		req := httptest.NewRequest("GET", "/products", nil)
		rr := httptest.NewRecorder()
		handleProducts(rr, req)

		if rr.Code != http.StatusOK {
			t.Errorf("Expected 200, got %d", rr.Code)
		}

		var products []Product
		if err := json.NewDecoder(rr.Body).Decode(&products); err != nil {
			t.Errorf("Invalid JSON: %v", err)
		}

		if len(products) != 3 {
			t.Errorf("Expected 3 products, got %d", len(products))
		}
	})

	t.Run("OPTIONS returns 200", func(t *testing.T) {
		req := httptest.NewRequest("OPTIONS", "/products", nil)
		rr := httptest.NewRecorder()
		handleProducts(rr, req)

		if rr.Code != http.StatusOK {
			t.Errorf("Expected 200, got %d", rr.Code)
		}

		if rr.Body.Len() != 0 {
			t.Error("Expected empty body")
		}
	})

	t.Run("Invalid method returns 200", func(t *testing.T) {
		req := httptest.NewRequest("DELETE", "/products", nil)
		rr := httptest.NewRecorder()
		handleProducts(rr, req)

		if rr.Code != http.StatusOK {
			t.Errorf("Expected 200, got %d", rr.Code)
		}
	})

}

func TestCheckoutEndpoint(t *testing.T) {
	t.Run("Valid checkout returns 200", func(t *testing.T) {
		data, _ := json.Marshal([]Product{{ID: 1, Name: "Laptop", Price: 5000}})
		req := httptest.NewRequest("POST", "/checkout", bytes.NewReader(data))
		req.Header.Set("Content-Type", "application/json")
		rr := httptest.NewRecorder()

		handleCheckout(rr, req)

		if rr.Code != http.StatusOK {
			t.Errorf("Expected 200, got %d", rr.Code)
		}
	})

	t.Run("Invalid JSON returns 200", func(t *testing.T) {
		req := httptest.NewRequest("POST", "/checkout", bytes.NewReader([]byte("{bad")))
		rr := httptest.NewRecorder()
		handleCheckout(rr, req)

		if rr.Code != http.StatusOK {
			t.Errorf("Expected 200, got %d", rr.Code)
		}
	})
}

func TestCORSHeadersAreSet(t *testing.T) {
	req := httptest.NewRequest("GET", "/products", nil)
	rr := httptest.NewRecorder()
	handleProducts(rr, req)

	h := rr.Header()

	if h.Get("Access-Control-Allow-Origin") != "*" {
		t.Error("Missing Access-Control-Allow-Origin")
	}
	if h.Get("Access-Control-Allow-Methods") != "GET, POST, OPTIONS" {
		t.Error("Missing Access-Control-Allow-Methods")
	}
	if h.Get("Access-Control-Allow-Headers") != "Content-Type" {
		t.Error("Missing Access-Control-Allow-Headers")
	}
}
