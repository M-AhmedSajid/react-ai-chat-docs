import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";

export default function Layout({ children }) {
  const { nav, ...base } = baseOptions();
  return (
    <DocsLayout
      {...base}
      tree={source.getPageTree()}
      nav={{ ...nav, mode: "top" }}
    >
      {children}
    </DocsLayout>
  );
}
