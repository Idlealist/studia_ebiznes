import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Checkout from '../components/Checkout';
import { CartContext } from '../context/CartContext';

jest.mock('axios');

describe('Checkout Component', () => {
  const mockClearCart = jest.fn();
  const mockCartContext = {
    cart: [],
    clearCart: mockClearCart
  };

  const renderCheckout = (cart = []) => {
    return render(
      <CartContext.Provider value={{ cart, clearCart: mockClearCart }}>
        <Checkout />
      </CartContext.Provider>
    );
  };

  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('displays checkout headings', () => {
    renderCheckout();
    expect(screen.getByText('Płatności')).toBeInTheDocument();
    expect(screen.getByText(/Suma:/i)).toBeInTheDocument();
  });

  test('displays correct total when cart has items', () => {
    const cart = [
      { id: 1, price: 10 },
      { id: 2, price: 20.5 }
    ];
    renderCheckout(cart);
    expect(screen.getByText('Suma: 30.50 zł')).toBeInTheDocument();
  });

  test('disables payment button when cart is empty', () => {
    renderCheckout();
    const button = screen.getByRole('button', { name: /Zapłać teraz/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Zapłać teraz');
  });

  test('calls checkout API and clears cart on successful payment', async () => {
    axios.post.mockResolvedValue({});
    const cart = [{ id: 1, price: 10 }];
    renderCheckout(cart);
    
    fireEvent.click(screen.getByRole('button', { name: /Zapłać teraz/i }));
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/checkout',
        cart,
        { headers: { 'Content-Type': 'application/json' } }
      );
      expect(mockClearCart).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Płatność zakończona!');
    });
  });

  test('handles checkout error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    axios.post.mockRejectedValue(new Error('Checkout failed'));
    const cart = [{ id: 1, price: 10 }];
    renderCheckout(cart);
    
    fireEvent.click(screen.getByRole('button', { name: /Zapłać teraz/i }));
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    });
    
    consoleErrorSpy.mockRestore();
  });

  test('handles negative(discounts) or zero prices', () => {
    const cart = [
      { id: 1, price: -5 },
      { id: 2, price: 0 }
    ];
    renderCheckout(cart);
    expect(screen.getByText('Suma: -5.00 zł')).toBeInTheDocument(); 
    expect(screen.getByRole('button', { name: /Zapłać teraz/i })).not.toBeDisabled();
  });

  test('button remains enabled after click with cart items', async () => {
    axios.post.mockResolvedValue({});
    const cart = [{ id: 1, price: 10 }];
    renderCheckout(cart);
    
    const button = screen.getByRole('button', { name: /Zapłać teraz/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(mockClearCart).toHaveBeenCalled();
    });
  });
});