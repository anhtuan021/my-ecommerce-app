import Link from 'next/link';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
<nav style={{ padding: 16, background: '#222', color: 'white' }}>
  <Link href="/" style={{ marginRight: 20, color: 'white' }}>Home</Link>
  <Link href="/products/create" style={{ color: 'white' }}>Create Product</Link>
</nav>

      <main style={{ maxWidth: 800, margin: '20px auto', padding: '0 16px' }}>
        {children}
      </main>
    </>
  );
}
