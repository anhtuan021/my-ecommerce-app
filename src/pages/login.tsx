import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      alert("Please add informations");
      return;
    }

    try {
      const res = await fetch('/api/auth/Login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();

        localStorage.setItem('token', data.token);
        router.push('/'); 
      } else {
        alert("Your account is not corrected");
      }
    } catch (error) {
      console.error(error);
      alert("Error alert!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, padding: 20, border: '1px solid #ccc', borderRadius: 12, background: '#f8f9fa', margin: '50px auto' }}>
      <h2 style={{ marginBottom: 20 }}>Login</h2>

      <label style={{ display:'block', marginBottom: 12 }}>
        Email:
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width:'100%', padding: 8, borderRadius: 6, border:'1px solid #ccc' }}
        />
      </label>

      <label style={{ display:'block', marginBottom: 12 }}>
        Password:
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width:'100%', padding: 8, borderRadius: 6, border:'1px solid #ccc' }}
        />
      </label>

      <button
        type="submit"
        style={{ padding:'10px 20px', background: '#1D4ED8', color:'white', border:'none', borderRadius:'6px' }}>
        Login
      </button>
    </form>
  );
}
