import { useMemo, useState } from "react";
import { mockFeed } from "./feedData";
import type { FeedItem } from "./feedType";

export default function Feed() {
  const PAGE_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visiblePosts = useMemo(
    () => (mockFeed as FeedItem[]).slice(0, visibleCount),
    [visibleCount]
  );

  const canLoadMore = visibleCount < (mockFeed as FeedItem[]).length;

  return (
    <section style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h2 style={{ margin: "0 0 12px 0" }}>Feed</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {visiblePosts.map((p) => (
          <article
            key={p.id}
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 14,
              padding: 12,
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              r/{p.sub} • u/{p.author}
            </div>

            <h3 style={{ margin: "8px 0 0 0", fontSize: 18 }}>{p.title}</h3>

            {"thumbnail" in p && (p as any).thumbnail && (
              <img
                src={(p as any).thumbnail}
                alt=""
                style={{
                  width: "100%",
                  maxHeight: 260,
                  objectFit: "cover",
                  borderRadius: 12,
                  marginTop: 10,
                }}
              />
            )}

            {"url" in p && (p as any).url && (
              <div style={{ marginTop: 10 }}>
                <a href={(p as any).url} target="_blank" rel="noreferrer">
                  Ouvrir
                </a>
              </div>
            )}
          </article>
        ))}
      </div>

      {canLoadMore && (
        <div style={{ marginTop: 14 }}>
          <button
            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
              cursor: "pointer",
            }}
          >
            Charger plus
          </button>
        </div>
      )}
    </section>
  );
}