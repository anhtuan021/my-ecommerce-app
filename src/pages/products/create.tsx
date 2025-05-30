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
      <h1>Create New Product</h1>
      <ProductForm onSubmit={onSubmit} />
    </Layout>
  );
}
