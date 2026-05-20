// Article card — image, kicker, serif headline, byline + relative time.
function ArticleCard({ kicker, title, byline, time, cover, variant, onOpen }) {
  const style = cover && cover.startsWith('#') ? { background: cover } : undefined;
  return (
    <article className={'bh-article' + (variant === 'feature' ? ' bh-article--feature' : '')} onClick={onOpen}>
      {cover && (
        <div className="bh-article__cover" style={style}>
          {!cover.startsWith('#') && <img src={cover} alt="" />}
        </div>
      )}
      <div className="bh-article__body">
        {kicker && <div className="bh-kicker">{kicker}</div>}
        <h3 className="bh-article__headline">{title}</h3>
        <div className="bh-article__meta">
          {byline && <span className="bh-byline">{byline}</span>}
          {time && <span className="bh-article__time">· {time}</span>}
        </div>
      </div>
    </article>
  );
}

// Compact list row — used in "Most Read" rail.
function ArticleRow({ index, title, byline, time, onOpen }) {
  return (
    <a className="bh-artrow" href="#" onClick={(e) => { e.preventDefault(); onOpen && onOpen(); }}>
      {typeof index === 'number' && <div className="bh-artrow__num">{index}</div>}
      <div className="bh-artrow__body">
        <div className="bh-artrow__title">{title}</div>
        <div className="bh-artrow__meta">
          {byline && <span>{byline}</span>}
          {time && <span> · {time}</span>}
        </div>
      </div>
    </a>
  );
}

Object.assign(window, { ArticleCard, ArticleRow });
