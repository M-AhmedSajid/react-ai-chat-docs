"use client";

import dynamic from "next/dynamic";
import { RootProvider } from "fumadocs-ui/provider/base";

const SearchDialog = dynamic(() => import("@/components/search"), {
  ssr: false,
});

export function Provider({ children }) {
  return (
    <RootProvider
      search={{
        SearchDialog,
      }}
    >
      {children}
    </RootProvider>
  );
}

export { SearchDialog };
