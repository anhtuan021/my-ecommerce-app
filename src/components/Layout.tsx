import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/";
  };

  return (
    <>
      <nav
        style={{
          padding: 16,
          background: "#fff",
          color: "#fff",
          boxShadow: "0 4px 14px #00000020",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#ff5c5c",
              fontWeight: "bold",
              fontSize: "1.5rem",
              textDecoration: "none",
            }}
          >
            Clothing Store
          </Link>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link
              href="/cart"
              style={{
                color: "#EF4444",
                fontWeight: "bold",
                textDecoration: "none",
                padding: "8px 16px",
                border: "1px solid #fca5a5",
                borderRadius: 8,
                background: "#fff5f5",
                marginRight: 8,
                transition: "all 0.2s",
              }}
            >
              Cart
            </Link>

            {token && (
              <Link
                href="/orders"
                style={{
                  color: "#3B82F6",
                  fontWeight: "bold",
                  textDecoration: "none",
                  padding: "8px 16px",
                  border: "1px solid #bfdbfe",
                  borderRadius: 8,
                  background: "#eff6ff",
                  transition: "all 0.2s",
                }}
              >
                Orders
              </Link>
            )}



            {token ? (
              <>
                <Link
                  href="/products/create"
                  style={{
                    color: "#ff5c5c",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    border: "2px solid #ff5c5c",
                    borderRadius: "8px",
                    textDecoration: "none",
                    background: "#fff5f5",
                    transition: "all 0.3s ease",
                    display: "inline-block",
                    boxShadow: "0 4px 14px rgba(255, 92, 92, 0.4)",
                  }}
                >
                  + Create Product
                </Link>

                <button
                  onClick={handleLogout}
                  style={{
                    padding: "8px 16px",
                    background: "#ff5c5c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{
                    color: "#fff",
                    background: "#ff5c5c",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    marginRight: "10px",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  style={{
                    color: "#ff5c5c",
                    background: "#fff0f0",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "1px solid #ff5c5c",
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "0 16px",
        }}
      >
        {children}
      </main>

      <footer style={{ textAlign: "center", padding: "20px", color: "#888" }}>
        &copy; 2025 Clothing Store — All rights reserved
      </footer>
    </>
  );
}
