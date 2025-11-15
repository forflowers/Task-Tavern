"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/`)
      .then((res) => res.text())
      .then((text) => setMessage(text))
      .catch((err) => console.error("Error fetching backend:", err));
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Task Tavern Frontend</h1>
      <p>Backend says: {message || "Loading..."}</p>
    </main>
  );
}
