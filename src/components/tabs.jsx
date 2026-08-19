"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { cn } from "../lib/cn";
import * as Unstyled from "./ui/tabs";

const TabsContext = createContext(null);

function useTabContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("You must wrap your component in <Tabs>");
  return ctx;
}

export function TabsList({ className, ...props }) {
  return (
    <Unstyled.TabsList
      {...props}
      className={(s) =>
        cn(
          "flex gap-3.5 text-fd-secondary-foreground overflow-x-auto px-4 not-prose",
          typeof className === "function" ? className(s) : className,
        )
      }
    />
  );
}

export function TabsTrigger({ className, ...props }) {
  return (
    <Unstyled.TabsTrigger
      {...props}
      className={(s) =>
        cn(
          "inline-flex items-center gap-2 whitespace-nowrap text-fd-muted-foreground border-b border-transparent py-2 text-sm font-medium transition-colors [&_svg]:size-4 hover:text-fd-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-active:border-fd-primary data-active:text-fd-primary",
          typeof className === "function" ? className(s) : className,
        )
      }
    />
  );
}

export function Tabs({
  ref,
  className,
  items,
  label,
  defaultIndex = 0,
  defaultValue = items ? escapeValue(items[defaultIndex]) : undefined,
  ...props
}) {
  const [value, setValue] = useState(defaultValue);
  const collection = useMemo(() => [], []);

  return (
    <Unstyled.Tabs
      ref={ref}
      className={(s) =>
        cn(
          "flex flex-col overflow-hidden rounded-xl border bg-fd-secondary my-4",
          typeof className === "function" ? className(s) : className,
        )
      }
      value={value}
      onValueChange={(v) => {
        if (items && !items.some((item) => escapeValue(item) === v)) return;
        setValue(v);
      }}
      {...props}
    >
      {items && (
        <TabsList>
          {label && (
            <span className="text-sm font-medium my-auto me-auto">{label}</span>
          )}
          {items.map((item) => (
            <TabsTrigger key={item} value={escapeValue(item)}>
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
      )}
      <TabsContext.Provider
        value={useMemo(() => ({ items, collection }), [collection, items])}
      >
        {props.children}
      </TabsContext.Provider>
    </Unstyled.Tabs>
  );
}

export function Tab({ value, ...props }) {
  const { items } = useTabContext();
  const resolved =
    value ??
    // eslint-disable-next-line react-hooks/rules-of-hooks -- `value` is not supposed to change
    items?.at(useCollectionIndex());
  if (!resolved)
    throw new Error(
      "Failed to resolve tab `value`, please pass a `value` prop to the Tab component.",
    );

  return (
    <TabsContent value={escapeValue(resolved)} {...props}>
      {props.children}
    </TabsContent>
  );
}

export function TabsContent({ value, className, ...props }) {
  return (
    <Unstyled.TabsContent
      value={value}
      className={(s) =>
        cn(
          "p-4 text-[0.9375rem] bg-fd-background rounded-xl outline-none prose-no-margin data-inactive:hidden [&>figure:only-child]:-m-4 [&>figure:only-child]:border-none",
          typeof className === "function" ? className(s) : className,
        )
      }
      {...props}
    >
      {props.children}
    </Unstyled.TabsContent>
  );
}

/**
 * Inspired by Headless UI.
 *
 * Return the index of children, this is made possible by registering the order of render from children using React context.
 * This is supposed by work with pre-rendering & pure client-side rendering.
 */
function useCollectionIndex() {
  const key = useId();
  const { collection } = useTabContext();

  useEffect(() => {
    return () => {
      const idx = collection.indexOf(key);
      if (idx !== -1) collection.splice(idx, 1);
    };
  }, [key, collection]);

  if (!collection.includes(key)) collection.push(key);
  return collection.indexOf(key);
}

/**
 * only escape whitespaces in values in simple mode
 */
function escapeValue(v) {
  return v.toLowerCase().replace(/\s/, "-");
}
