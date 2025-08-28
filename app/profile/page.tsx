"use client";

import { useEffect, useState } from "react";

type Photo = {
  id: string;
  image_url: string;
  thumbnail_url: string | null;
  caption: string | null;
};

export default function Profile() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async (q: string) => {
    setLoading(true);
    const res = await fetch(`/api/photos?q=${encodeURIComponent(q)}`);
    const { results } = await res.json();
    setPhotos(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos(""); // carga inicial
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search photos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchPhotos(query)}
        className="border p-2 rounded"
      />
      {loading && <p>Loading...</p>}
      <ul className="grid grid-cols-3 gap-4 mt-4">
        {photos.map((p) => (
          <li key={p.id}>
            <img
              src={p.thumbnail_url ?? p.image_url}
              alt={p.caption ?? "Photo"}
              className="rounded shadow"
            />
            <p className="text-sm">{p.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
