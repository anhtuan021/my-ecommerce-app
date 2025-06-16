import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Props {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
  };
}

export default function ProductCard({ product }: Props) {
  const [, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        boxShadow: '0 4px 14px rgb(0 0 0 / 0.1)',
        background: '#fff',
        transition: 'transform 0.2s ease-in-out',
        transform: 'translateY(0)',
      }}>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: '100%', height: 150, objectFit: 'contain', borderRadius: 12, marginBottom: 16 }}
        />
      )}

      <h3 style={{ marginBottom: 12, fontSize: 20, color: '#334155' }}>
        {product.name}
      </h3>
      <Link
        href={`/products/${product.id}`}
        style={{ color: '#1D4ED8', fontWeight: 'bold', textDecoration: 'none' }}>
        View Detail
      </Link>
    </div>
  );
}
