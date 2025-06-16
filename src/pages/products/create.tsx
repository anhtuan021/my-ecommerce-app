import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductForm from '../../components/ProductForm';

export default function CreateProduct() {
  const router = useRouter();

  async function onSubmit(data: { name: string; description: string; price: number; image?: string }) {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Failed to create product');
    }
  }

  return (
    <Layout>
      <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
        <ProductForm onSubmit={onSubmit} />
        <button
          onClick={() => router.push('/')}
          style={{ marginTop: '20px', padding: '10px 20px', background: '#fff0f0', color: '#ff5c5c', border: '1px solid #ff5c5c', borderRadius: '8px' }}>
          Back to Product List
        </button>
      </div>
    </Layout>
  );

}