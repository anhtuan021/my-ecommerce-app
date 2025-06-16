import useSWR from 'swr';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { IProduct } from '../models/Product';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data: products, error } = useSWR<IProduct[]>('/api/products', fetcher);

  if (error) return <Layout><p>Failed to load products.</p></Layout>;
  if (!products) return <Layout><p>Loading...</p></Layout>;

  return (
  <Layout>
    <h1 style={{ color: '#ff5c5c', marginBottom: '20px' }}>Clothing Products</h1>

    {products.length === 0 ? (
      <p>No products found.</p>
    ) : (
      <div
        style={{ 
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))',
          gap:'20px',
          padding:'20px',
          background:'#f8f9fa',
          borderRadius:'12px'
        }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )}

  </Layout>
);
}