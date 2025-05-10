import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Products from '../components/Products';
import { CartContext } from '../context/CartContext';
import { act } from 'react';

jest.mock('axios');

describe('Products Component', () => {
  const mockAddToCart = jest.fn();
  const mockCartContext = {
    addToCart: mockAddToCart
  };


  const renderProducts = async () => {
    await act(async () => {
      render(
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <Products />
        </CartContext.Provider>
      );
    });
  };


  test('displays products heading', async () => {
    axios.get.mockResolvedValue({ data: [] });

    await renderProducts();

    expect(await screen.findByText('Produkty')).toBeInTheDocument();
    expect(screen.getByText('Produkty').tagName).toBe('H2');
  });

  test('fetches and displays products', async () => {
    const products = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 }
    ];
    axios.get.mockResolvedValue({ data: products });
    
    await renderProducts();
    
    expect(await screen.findByText('Product 1 - 10 zł')).toBeInTheDocument();
    expect(await screen.findByText('Product 2 - 20 zł')).toBeInTheDocument();
  });

  test('handles API error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    axios.get.mockRejectedValue(new Error('Fetch failed'));
    
    await renderProducts();
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 
    });
    
    consoleErrorSpy.mockRestore();
  });

  test('adds product to cart when button is clicked', async () => {
    const products = [{ id: 1, name: 'Product 1', price: 10 }];
    axios.get.mockResolvedValue({ data: products });
    
    await renderProducts();
    
    const button = await screen.findByRole('button', { name: /Dodaj do koszyka/i });
    fireEvent.click(button);
    
    expect(mockAddToCart).toHaveBeenCalledWith(products[0]);
  });

  test('handles empty product list', async () => {
    axios.get.mockResolvedValue({ data: [] });
    
    await renderProducts();
    
    expect(screen.getByText('Produkty')).toBeInTheDocument();
    expect(screen.queryByText(/- \d+ zł/)).not.toBeInTheDocument();
  });
});