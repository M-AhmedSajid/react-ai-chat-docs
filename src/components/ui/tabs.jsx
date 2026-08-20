"use client";

import {
  createContext,
  use,
  useEffectEvent,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Tabs as Primitive } from "@base-ui/react/tabs";
import { mergeRefs } from "../../lib/merge-refs";

const TabsContext = createContext(null);

function useTabContext() {
  const ctx = use(TabsContext);
  if (!ctx) throw new Error("You must wrap your component in <Tabs>");
  return ctx;
}

export const TabsList = Primitive.List;

export const TabsTrigger = Primitive.Tab;

export function Tabs({
  ref,
  groupId,
  persist = false,
  updateAnchor = false,
  defaultValue,
  value: _value,
  onValueChange: _onValueChange,
  ...props
}) {
  const tabsRef = useRef < HTMLDivElement > null;
  const valueToIdMap = useMemo(() => new Map(), []);
  const panels = useMemo(() => new Map(), []);
  const [value, setValue] =
    _value === undefined
      ? // eslint-disable-next-line react-hooks/rules-of-hooks -- not supposed to change controlled/uncontrolled
        useState(defaultValue)
      : // eslint-disable-next-line react-hooks/rules-of-hooks -- not supposed to change controlled/uncontrolled
        [_value, useEffectEvent((v) => _onValueChange?.(v))];

  useLayoutEffect(() => {
    if (!groupId) return;
    let previous = sessionStorage.getItem(groupId);
    if (persist) previous ??= localStorage.getItem(groupId);
    if (previous) setValue(previous);

    const groupListeners = listeners.get(groupId) ?? new Set();
    groupListeners.add(setValue);
    listeners.set(groupId, groupListeners);
    return () => {
      groupListeners.delete(setValue);
    };
  }, [groupId, persist, setValue]);

  useLayoutEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      // hash points to a tab's own anchor id
      for (const [value, id] of valueToIdMap.entries()) {
        if (id === hash) {
          setValue(value);
          tabsRef.current?.scrollIntoView();
          return;
        }
      }

      // hash points to an element inside a mounted (e.g. `keepMounted`) panel,
      // open the tab it belongs to, then scroll to it once the panel is visible.
      const target = document.getElementById(hash);
      if (!target) return;

      for (const [value, panel] of panels.entries()) {
        if (!panel.contains(target)) continue;

        setValue(value);
        requestAnimationFrame(() => target.scrollIntoView());
        return;
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [setValue, valueToIdMap, panels]);

  return (
    <Primitive.Root
      ref={mergeRefs(ref, tabsRef)}
      value={value}
      onValueChange={(v) => {
        if (updateAnchor) {
          const id = valueToIdMap.get(v);

          if (id) {
            window.history.replaceState(null, "", `#${id}`);
          }
        }

        if (groupId) {
          const groupListeners = listeners.get(groupId);
          if (groupListeners) {
            for (const listener of groupListeners) listener(v);
          }

          sessionStorage.setItem(groupId, v);
          if (persist) localStorage.setItem(groupId, v);
        } else {
          setValue(v);
        }
      }}
      {...props}
    >
      <TabsContext
        value={useMemo(
          () => ({ valueToIdMap, panels }),
          [valueToIdMap, panels],
        )}
      >
        {props.children}
      </TabsContext>
    </Primitive.Root>
  );
}

export function TabsContent({ value, ref, ...props }) {
  const { valueToIdMap, panels } = useTabContext();

  if (props.id) {
    valueToIdMap.set(value, props.id);
  }

  return (
    <Primitive.Panel
      ref={mergeRefs(ref, (element) => {
        if (element) panels.set(value, element);
        else panels.delete(value);
      })}
      value={value}
      {...props}
    >
      {props.children}
    </Primitive.Panel>
  );
}
