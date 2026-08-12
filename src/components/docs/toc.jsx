import Link from "next/link";

export function TableOfContents({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-20 w-48">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          On this page
        </p>

        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              style={{
                paddingLeft: `${Math.max(0, item.depth - 2) * 12}px`,
              }}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
