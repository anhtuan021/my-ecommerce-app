import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../../../components/Layout';
import ProductForm from '../../../components/ProductForm';
import { IProduct } from '../../../models/Product';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const { data: product, error } = useSWR<IProduct>(id ? `/api/products/${id}` : null, fetcher);

  async function onSubmit(data: { name: string; description: string; price: number; image?: string }) {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) router.push(`/products/${id}`);
    else alert('Failed to update product');
  }

  if (error) return <Layout><p>Failed to load product.</p></Layout>;
  if (!product) return <Layout><p>Loading...</p></Layout>;

  return (
  <Layout>
    <h1 style={{ color: '#ff5c5c', marginBottom:'20px' }}>Edit Product</h1>

    <div style={{ padding:'20px', background:'#f8f9fa', borderRadius:'12px' }}>
      <ProductForm initialData={product} onSubmit={onSubmit} />

      <button
        onClick={() => router.push('/')}
        style={{ marginTop:'20px', padding:'10px 20px', background:'#fff0f0', color:'#ff5c5c', border:'1px solid #ff5c5c', borderRadius:'8px' }}>
        Back to Product List
      </button>
    </div>
  </Layout>
);

}