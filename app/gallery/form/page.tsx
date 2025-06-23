"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GalleryForm() {
  const [piid, setPiid] = useState("");
  const [productId, setProductId] = useState("");
  const [scid, setScid] = useState("");
  const [ck, setCk] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      piid,
      productId,
      scid,
      ...(ck && { ck }),
    });
    router.push(`/gallery?${params.toString()}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6b53ff 0%, #232526 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(16px)',
        padding: '2.5rem 2rem',
        borderRadius: '1.25rem',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        width: '100%',
        maxWidth: '28rem',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: 'white',
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>
          Eko Embed Gallery
        </h1>
        <p style={{
          color: '#e0e7ff',
          fontSize: '1.05rem',
          marginBottom: '2rem',
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          This form requires a project to be published using the React integration type.  Enter the details below to generate a URL for an embeddable gallery.
        </p>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#c7d2fe',
                marginBottom: '0.5rem',
              }}>
                PIID
              </label>
              <input
                type="text"
                value={piid}
                onChange={e => setPiid(e.target.value)}
                required
                style={{
                  width: '90%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border 0.2s',
                  marginBottom: 0,
                }}
                placeholder="e.g., a08d9148-476b-4a21-b803-1c18525e1bca"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#c7d2fe',
                marginBottom: '0.5rem',
              }}>
                Product ID
              </label>
              <input
                type="text"
                value={productId}
                onChange={e => setProductId(e.target.value)}
                required
                style={{
                  width: '90%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border 0.2s',
                  marginBottom: 0,
                }}
                placeholder="e.g., idc_walmart_gallery_mock"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#c7d2fe',
                marginBottom: '0.5rem',
              }}>
                SCID
              </label>
              <input
                type="text"
                value={scid}
                onChange={e => setScid(e.target.value)}
                required
                style={{
                  width: '90%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border 0.2s',
                  marginBottom: 0,
                }}
                placeholder="e.g., 71e2e7cb-eb18-4da9-a37b-6566557c8d1f"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#c7d2fe',
                marginBottom: '0.5rem',
              }}>
                Cache Buster (ck)
              </label>
              <input
                type="text"
                value={ck}
                onChange={e => setCk(e.target.value)}
                placeholder="Optional"
                style={{
                  width: '90%',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(99,102,241,0.15)',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border 0.2s',
                  marginBottom: 0,
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #7f53ff 0%, #647dee 100%)',
                color: 'white',
                padding: '0.9rem 1rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 600,
                marginTop: '0.5rem',
                boxShadow: '0 2px 8px rgba(99,102,241,0.15)',
                transition: 'background 0.2s, transform 0.1s',
              }}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Go to Gallery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 