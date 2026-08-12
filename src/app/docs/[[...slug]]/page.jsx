import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";

import { source } from "@/lib/source";
import { DocsBody, DocsPage } from "fumadocs-ui/layouts/notebook/page";

export default async function Page({ params }) {
  const { slug } = await params;

  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      breadcrumb={{
        includeRoot: true,
        includeSeparator: true,
        includePage: true,
      }}
    >
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}
