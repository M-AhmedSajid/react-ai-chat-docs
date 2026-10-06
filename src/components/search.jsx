"use client";

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
} from "fumadocs-ui/components/dialog/search";
import { useDocsSearch } from "fumadocs-core/search/client";
import { fetchClient } from "fumadocs-core/search/client/fetch";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useTreeContext } from "fumadocs-ui/contexts/tree";
import { useRouter } from "next/navigation";

export default function CustomSearchDialog(props) {
  const { search, setSearch, query } = useDocsSearch({
    client: fetchClient({
      api: "/api/search",
    }),
  });

  const { full } = useTreeContext();
  const router = useRouter();

  const searchMap = useMemo(() => {
    const map = new Map();

    function onNode(node) {
      if (node.type === "page" && typeof node.name === "string") {
        map.set(node.name.toLowerCase(), node);
      } else if (node.type === "folder") {
        if (node.index) onNode(node.index);

        for (const item of node.children) {
          onNode(item);
        }
      }
    }

    for (const item of full.children) {
      onNode(item);
    }

    return map;
  }, [full]);

  const pageTreeAction = useMemo(() => {
    if (search.length === 0) return;

    const normalized = search.toLowerCase();

    for (const [name, page] of searchMap) {
      if (!name.startsWith(normalized)) continue;

      return {
        id: "quick-action",
        type: "action",
        node: (
          <div className="inline-flex items-center gap-2 text-fd-muted-foreground">
            <ArrowRight className="size-4" />

            <p>
              Jump to{" "}
              <span className="font-medium text-fd-foreground">
                {page.name}
              </span>
            </p>
          </div>
        ),
        onSelect: () => {
          router.push(page.url);
        },
      };
    }
  }, [router, search, searchMap]);

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />

      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>

        <SearchDialogList
          items={
            query.data !== "empty" || pageTreeAction
              ? [
                  ...(pageTreeAction ? [pageTreeAction] : []),
                  ...(Array.isArray(query.data) ? query.data : []),
                ]
              : null
          }
        />
      </SearchDialogContent>
    </SearchDialog>
  );
}
