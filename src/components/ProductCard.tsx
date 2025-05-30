import React from 'react';
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
  return (
    <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 6, marginBottom: 16 }}>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: '100%', height: 150, objectFit: 'contain' }}
        />
      )}
      <h3>{product.name}</h3>
      <p>
        {product.description.slice(0, 100)}
        {product.description.length > 100 ? '...' : ''}
      </p>
      <p><strong>Price: ${product.price.toFixed(2)}</strong></p>
      <Link href={`/products/${product.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
        View Detail
      </Link>
    </div>
  );
}
