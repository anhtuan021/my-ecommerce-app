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
  onSubmit({
    name: name.trim(),
    description: description.trim(),
    price: parseFloat(price),
    image: image.trim() || undefined, // avoid saving empty string
  });
}


  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
      <label>
        Name:
        <input
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
      </label>
      <label>
        Description:
        <textarea
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12, minHeight: 100 }}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          step="0.01"
          required
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
      </label>
      <label>
        Image URL:
        <input
          type="url"
          value={image}
          onChange={e => setImage(e.target.value)}
          placeholder="Optional"
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
      </label>
      <button type="submit" style={{ padding: '10px 20px' }}>
        Save
      </button>
    </form>
  );
}
