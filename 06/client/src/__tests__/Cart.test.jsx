// src/__tests__/Cart.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../components/Cart';
import { CartContext } from '../context/CartContext';

describe('Cart Component', () => {
  const renderCart = (cart = []) => {
    return render(
      <CartContext.Provider value={{ cart }}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </CartContext.Provider>
    );
  };

  test('displays cart heading', () => {
    renderCart();
    expect(screen.getByText('Koszyk')).toBeInTheDocument();
  });

  test('displays empty cart message when cart is empty', () => {
    renderCart();
    expect(screen.getByText('Koszyk jest pusty')).toBeInTheDocument(); 
  });

  test('disables payment button when cart is empty', () => {
    renderCart();
    const button = screen.getByRole('button', { name: /Przejdź do płatności/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Przejdź do płatności');
  });

  test('displays cart items correctly', () => {
    const cart = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 }
    ];
    renderCart(cart);
    expect(screen.getByText('Product 1 - 10 zł x 2')).toBeInTheDocument();
    expect(screen.getByText('Product 2 - 20 zł x 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 3 - 30 zł x 1')).not.toBeInTheDocument();
  });

  test('enables payment button when cart has items', () => {
    const cart = [{ id: 1, name: 'Product 1', price: 10 }];
    renderCart(cart);
    const button = screen.getByRole('button', { name: /Przejdź do płatności/i });
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Przejdź do płatności');
  });

  test('handles items with missing properties', () => {
    const cart = [
      { id: 1, price: 10 },
      { id: 2, name: 'Product 2' }
    ];
    renderCart(cart);
    expect(screen.getByText('- 10 zł x 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2 - zł x 1')).toBeInTheDocument(); 
  });

  test('payment link has correct destination', () => {
    renderCart();
    const link = screen.getByRole('link', { name: /Przejdź do płatności/i });
    expect(link).toHaveAttribute('href', '/platnosci'); 
    expect(link).toBeInTheDocument();
  });
});