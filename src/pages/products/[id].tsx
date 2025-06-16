import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import { IProduct } from '@/models/Product';
import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  });

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: product, error } = useSWR<IProduct>(
    id ? `/api/products/${id}` : null,
    fetcher
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/');
      } else {
        console.error(await res.text());
        alert('Failed to delete product.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete product.');
    }
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
      <h1 style={{ color: '#ff5c5c', marginBottom: '20px' }}>
        {product.name}
      </h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: '12px' }}
        />
      )}

      <p style={{ marginBottom: '20px' }}>{product.description}</p>

      <p style={{ fontWeight: 'bold', color: '#ff5c5c', marginBottom: '20px' }}>
        Price: ${product.price.toFixed(2)}
      </p>

      <div style={{ display: 'flex', gap: '10px' }}>
        {isLoggedIn && (
          <>
            <Link
              href={`/products/edit/${product.id}`}
              style={{ padding: '10px 20px', background: '#ff5c5c', color: '#ffffff', border: 'none', borderRadius: '8px', textDecoration: 'none' }}>
              Edit
            </Link>

            <button
              onClick={() => handleDelete(product.id)}
              style={{ padding: '10px 20px', background: '#fff0f0', color: '#ff5c5c', border: '1px solid #ff5c5c', borderRadius: '8px' }}>
              Delete
            </button>
            
          </>
        )}
      <button
              onClick={() => router.push('/')}
              style={{ padding: '10px 20px', background: '#fff0f0', color: '#ff5c5c', border: '1px solid #ff5c5c', borderRadius: '8px' }}>
              Back to Product List
            </button>
      </div>
    </Layout>
  );
}

