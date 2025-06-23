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
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>Enter Gallery Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          PIID:
          <input
            type="text"
            value={piid}
            onChange={e => setPiid(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>
        <label>
          Product ID:
          <input
            type="text"
            value={productId}
            onChange={e => setProductId(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>
        <label>
          SCID:
          <input
            type="text"
            value={scid}
            onChange={e => setScid(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>
        <label>
          Cache Buster (ck):
          <input
            type="text"
            value={ck}
            onChange={e => setCk(e.target.value)}
            placeholder="Optional"
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>
        <button type="submit" style={{ marginTop: 16 }}>Go to Gallery</button>
      </form>
    </div>
  );
} 