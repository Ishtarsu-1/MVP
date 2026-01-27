import { useMemo, useState } from "react";
import { mockFeed } from "./feedData";
import type { FeedItem } from "./feedType";
import "./feed.css"

export default function Feed() {
  const PAGE_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visiblePosts = useMemo(
    () => (mockFeed as FeedItem[]).slice(0, visibleCount),
    [visibleCount]
  );

  const canLoadMore = visibleCount < (mockFeed as FeedItem[]).length;

  return (
    <section className="feed">
      <h2 className="feed-title">Feed</h2>

      <div className="feed-list">
        {visiblePosts.map((p) => (
          <article key={p.id} className="feed-card">
            <div className="feed-meta">
              r/{p.sub} • u/{p.author}
            </div>

            <h3 className="feed-title-post">{p.title}</h3>

            {"thumbnail" in p && (p as any).thumbnail && (
              <img
                src={(p as any).thumbnail}
                alt=""
                className="feed-image"
              />
            )}

            {"url" in p && (p as any).url && (
              <div className="feed-link">
                <a href={(p as any).url} target="_blank" rel="noreferrer">
                  Ouvrir
                </a>
              </div>
            )}
          </article>
        ))}
      </div>

      {canLoadMore && (
        <div className="feed-load-more">
          <button onClick={() => setVisibleCount(v => v + PAGE_SIZE)}>
            Charger plus
          </button>
        </div>
      )}
    </section>

  );
}