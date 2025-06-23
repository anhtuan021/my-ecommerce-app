import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

type CartItem = {
    productId: string;
    name: string;
    price: number;
    quantity: number;
};

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user?.id) {
                    setUserId(user.id);
                }
            } catch (err) {
                console.error('Invalid user data in localStorage:', err);
            }
        }

        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const placeOrder = async () => {
        if (!userId) {
            alert('You must be logged in to place an order.');
            return;
        }

        const orderPayload = {
            userId,
            products: cartItems.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            totalAmount: total,
        };

        setLoading(true);
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderPayload),
            });

            if (!res.ok) {
                throw new Error('Failed to place order');
            }

            localStorage.removeItem('cart');
            alert('Order placed successfully!');
            router.push('/orders');
        } catch (error) {
            console.error('Order placement error:', error);
            alert('Error placing order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>


                <h1
                    style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        marginBottom: 24,
                        color: '#EF4444',
                    }}
                >
                    Checkout
                </h1>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {cartItems.map(item => (
                            <div
                                key={item.productId}
                                style={{
                                    border: '1px solid #ddd',
                                    padding: 16,
                                    borderRadius: 12,
                                    background: '#fff',
                                    boxShadow: '0 4px 14px rgb(0 0 0 / 0.1)',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <p style={{ fontWeight: 600, marginBottom: 4 }}>{item.name}</p>
                                        <p style={{ margin: 0 }}>Quantity: {item.quantity}</p>
                                    </div>
                                    <p style={{ fontWeight: 'bold' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div style={{ textAlign: 'right', marginTop: 12 }}>
                            <p style={{ fontSize: 20, fontWeight: 600 }}>
                                Total: ${total.toFixed(2)}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                                <button
                                    onClick={() => router.push('/cart')}
                                    style={{
                                        background: '#f3f4f6',
                                        color: '#EF4444',
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        border: '1px solid #fca5a5',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Back to Cart
                                </button>

                                {isLoggedIn ? (
                                    <button
                                        onClick={placeOrder}
                                        disabled={loading}
                                        style={{
                                            backgroundColor: '#10B981',
                                            color: '#fff',
                                            padding: '10px 20px',
                                            border: 'none',
                                            borderRadius: 8,
                                            cursor: 'pointer',
                                            fontSize: 16,
                                        }}
                                    >
                                        {loading ? 'Placing Order...' : 'Place Order'}
                                    </button>
                                ) : (
                                    <p style={{ color: '#DC2626', margin: 0, alignSelf: 'center' }}>
                                        Please log in to place an order.
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </Layout>
    );
}
