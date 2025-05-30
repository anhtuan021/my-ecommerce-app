import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { IProduct } from '../../models/Product';

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  });

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: product, error } = useSWR<IProduct>(id ? `/api/products/${id}` : null, fetcher);

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    router.push('/');
  }

  if (error) return (
    <Layout>
      <p>Product not found.</p>
    </Layout>
  );
  if (!product) return (
    <Layout>
      <p>Loading...</p>
    </Layout>
  );

  return (
    <Layout>
      <h1>{product.name}</h1>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }}
        />
      )}
      <p>{product.description}</p>
      <p>
        <strong>Price: ${product.price.toFixed(2)}</strong>
      </p>
      <Link href={`/products/edit/${product.id}`} style={{ marginRight: 16 }}>
        Edit
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </Layout>
  );
}
