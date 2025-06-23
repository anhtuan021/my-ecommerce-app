import { useEffect, useState } from 'react';
import Layout from '@/components/Layout'; // ✅ Thêm dòng này

type Order = {
  _id: string;
  products: { productId: string; name: string; quantity: number }[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.id) {
          setUserId(user.id);
        }
      } catch (err) {
        console.error('Invalid user in localStorage', err);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#EF4444', marginBottom: 24 }}>Your Orders</h1>

        {loading ? (
          <p style={{ color: '#666' }}>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ color: '#666' }}>No orders found.</p>
        ) : (
          <div>
            {orders.map(order => (
              <div
                key={order._id}
                style={{
                  border: '1px solid #ddd',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 20,
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
                  background: '#fff',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                      Order ID: <span style={{ color: '#2563EB' }}>{order._id}</span>
                    </p>
                    <p style={{ fontSize: 14, color: '#888' }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      backgroundColor: '#f0f9ff',
                      color: '#0284C7',
                      padding: '4px 8px',
                      borderRadius: 8,
                      fontWeight: 500,
                      height: 'fit-content',
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                <p style={{ marginBottom: 8, fontWeight: 500 }}>
                  Total: <span style={{ color: '#EF4444' }}>${order.totalAmount.toFixed(2)}</span>
                </p>

                <div>
                  <p style={{ fontWeight: 600, marginBottom: 6 }}>Products:</p>
                  <ul style={{ paddingLeft: 20, color: '#374151', lineHeight: 1.6 }}>
                    {order.products.map((item, idx) => (
                      <li key={idx}>
                        {item.name || item.productId} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


    </Layout>
  );
}
