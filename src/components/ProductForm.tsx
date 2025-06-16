import React, { useState, FormEvent } from 'react';
import { IProduct } from '../models/Product';

interface Props {
  initialData?: Partial<IProduct>;
  onSubmit: (data: { name: string; description: string; price: number; image?: string }) => void;
}

export default function ProductForm({ initialData = {}, onSubmit }: Props) {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [price, setPrice] = useState(initialData.price?.toString() || '');
  const [image, setImage] = useState(initialData.image || '');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (name.trim() === '' || description.trim() === '' || price.trim() === '') {
      alert("Add information please.");
      return;
    }

    onSubmit({ 
      name: name.trim(), 
      description: description.trim(), 
      price: parseFloat(price), 
      image: image.trim() || undefined 
    });
  }

  return (
    <form 
      onSubmit={handleSubmit}
      style={{ maxWidth: 600, padding: 20, border: '1px solid #ccc', borderRadius: 12, background: '#f8f9fa' }}>
      <h2 style={{ marginBottom: 20 }}>Product Form</h2>

      <label style={{ display:'block', marginBottom: 12 }}>
        Name:
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
      </label>

      <label style={{ display:'block', marginBottom: 12 }}>
        Description:
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 100 }}
        />
      </label>

      <label style={{ display:'block', marginBottom: 12 }}>
        Price:
        <input
          type="number"
          step="0.01"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
      </label>

      <label style={{ display:'block', marginBottom: 12 }}>
        Image URL (optional):
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
      </label>

      <button
        type="submit"
        style={{ padding: '10px 20px', background: '#1D4ED8', color:'white', border:'none', borderRadius: 6 }}>
        Save
      </button>
    </form>
  );
}
