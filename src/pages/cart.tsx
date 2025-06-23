import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        } else {
          setCartItems([]);
        }
      }
    } catch (err) {
      console.error('Failed to load cart from localStorage:', err);
    }
  }, []);

  const updateQuantity = (productId: string, quantity: number) => {
    const updated = cartItems.map(item =>
      item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (productId: string) => {
    const updated = cartItems.filter(item => item.productId !== productId);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout>
      <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#EF4444', marginBottom: 24 }}>Your Cart</h1>

        {cartItems.length === 0 ? (
          <p style={{ color: '#666' }}>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div
                key={item.productId}
                style={{
                  display: 'flex',
                  gap: 16,
                  border: '1px solid #ddd',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 20,
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                  background: '#fff',
                  alignItems: 'center',
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 96,
                      height: 96,
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      backgroundColor: '#f3f4f6',
                      borderRadius: 8,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#94a3b8',
                    }}
                  >
                    No Image
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 600 }}>{item.name}</h2>
                  <p style={{ color: '#6b7280', margin: '4px 0' }}>${item.price.toFixed(2)}</p>

                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14 }}>Quantity:</span>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.productId, parseInt(e.target.value) || 1)
                      }
                      style={{
                        width: 60,
                        padding: '4px 8px',
                        border: '1px solid #ccc',
                        borderRadius: 6,
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  style={{
                    color: '#EF4444',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <div style={{ textAlign: 'right', borderTop: '1px solid #ddd', paddingTop: 16 }}>
              <p style={{ fontSize: 20, fontWeight: 700 }}>Total: ${total.toFixed(2)}</p>
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <Link href="/">
                  <button
                    style={{
                      background: '#f3f4f6',
                      color: '#EF4444',
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: '1px solid #fca5a5',
                      cursor: 'pointer',
                    }}
                  >
                    Back to Products
                  </button>
                </Link>

                <Link href="/checkout">
                  <button
                    style={{
                      background: '#2563EB',
                      color: '#fff',
                      padding: '10px 20px',
                      borderRadius: 10,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

