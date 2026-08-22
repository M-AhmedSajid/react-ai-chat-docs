"use client";
import { cn } from "../../lib/cn";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom";
import { buttonVariants } from "../ui/button";
import { CornerDownRightIcon, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useTransition,
} from "react";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { cva } from "class-variance-authority";
import { actionResponse, blockFeedback, pageFeedback } from "./schema";
import { z } from "zod/mini";
import { usePathname } from "fumadocs-core/framework";

const rateButtonVariants = cva(
  "inline-flex items-center gap-2 px-3 py-2 rounded-full font-medium border text-sm [&_svg]:size-4 disabled:cursor-not-allowed",
  {
    variants: {
      active: {
        true: "bg-fd-accent text-fd-accent-foreground [&_svg]:fill-current",
        false: "text-fd-muted-foreground",
      },
    },
  },
);

const pageFeedbackResult = z.extend(pageFeedback, {
  response: actionResponse,
});

const blockFeedbackResult = z.extend(blockFeedback, {
  response: actionResponse,
});

/**
 * A feedback component to be attached at the end of page
 */
export function Feedback({ onSendAction }) {
  const pathname = usePathname();
  const { previous, setPrevious } = useSubmissionStorage(pathname, (v) => {
    const result = pageFeedbackResult.safeParse(v);
    return result.success ? result.data : null;
  });
  const [opinion, setOpinion] = (useState < "good") | "bad" | (null > null);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit(e) {
    if (opinion == null) return;

    startTransition(async () => {
      const feedback = {
        url: location.href,
        opinion,
        message,
      };

      const response = await onSendAction(feedback);
      setPrevious({
        response,
        ...feedback,
      });
      setMessage("");
      setOpinion(null);
    });

    e?.preventDefault();
  }

  const activeOpinion = previous?.opinion ?? opinion;

  return (
    <Collapsible
      open={opinion !== null || previous !== null}
      onOpenChange={(v) => {
        if (!v) setOpinion(null);
      }}
      className="border-y py-3"
    >
      <div className="flex flex-row items-center gap-2">
        <p className="text-sm font-medium pe-2">How is this guide?</p>
        <button
          disabled={previous !== null}
          className={cn(
            rateButtonVariants({
              active: activeOpinion === "good",
            }),
          )}
          onClick={() => {
            setOpinion("good");
          }}
        >
          <ThumbsUp />
          Good
        </button>
        <button
          disabled={previous !== null}
          className={cn(
            rateButtonVariants({
              active: activeOpinion === "bad",
            }),
          )}
          onClick={() => {
            setOpinion("bad");
          }}
        >
          <ThumbsDown />
          Bad
        </button>
      </div>
      <CollapsibleContent className="mt-3">
        {previous ? (
          <div className="px-3 py-6 flex flex-col items-center gap-3 bg-fd-card text-fd-muted-foreground text-sm text-center rounded-xl">
            <p>Thank you for your feedback!</p>
            <div className="flex flex-row items-center gap-2">
              <a
                href={previous.response?.githubUrl}
                rel="noreferrer noopener"
                target="_blank"
                className={cn(
                  buttonVariants({
                    color: "primary",
                  }),
                  "text-xs",
                )}
              >
                View on GitHub
              </a>

              <button
                className={cn(
                  buttonVariants({
                    color: "secondary",
                  }),
                  "text-xs",
                )}
                onClick={() => {
                  setOpinion(previous.opinion);
                  setPrevious(null);
                }}
              >
                Submit Again
              </button>
            </div>
          </div>
        ) : (
          <form className="flex flex-col gap-3" onSubmit={submit}>
            <textarea
              autoFocus
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded-lg bg-fd-secondary text-fd-secondary-foreground p-3 resize-none focus-visible:outline-none placeholder:text-fd-muted-foreground"
              placeholder="Leave your feedback..."
              onKeyDown={(e) => {
                if (!e.shiftKey && e.key === "Enter") {
                  submit(e);
                }
              }}
            />
            <button
              type="submit"
              className={cn(buttonVariants({ color: "outline" }), "w-fit px-3")}
              disabled={isPending}
            >
              Submit
            </button>
          </form>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

/**
 * A feedback component for each content block in page, should be used with `remark-feedback-block`.
 *
 * See https://fumadocs.dev/docs/integrations/feedback.
 */
export function FeedbackText({ onSendAction, children }) {
  const [popup, _setPopup] = useState(null);

  const containerRef = useRef(null);
  const { refs, floatingStyles } = useFloating({
    open: popup !== null,
    placement: "bottom",
    middleware: [offset(6), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  function expandPopup() {
    if (popup?.mode !== "tooltip") return;

    const highlight = new Highlight(popup.range);
    CSS.highlights.set("fd-feedback-text", highlight);

    _setPopup({ ...popup, mode: "expanded" });
  }

  function closePopup() {
    if (popup?.mode === "expanded") {
      CSS.highlights.delete("fd-feedback-text");
    }

    _setPopup(null);
  }

  const updateSelectionPopover = useEffectEvent(() => {
    if (popup && popup.mode === "expanded") return;

    const container = containerRef.current;
    const selection = window.getSelection();

    if (
      !container ||
      !selection ||
      selection.isCollapsed ||
      selection.rangeCount === 0
    ) {
      closePopup();
      return;
    }

    const range = selection.getRangeAt(0).cloneRange();
    if (!container.contains(range.commonAncestorContainer)) {
      closePopup();
      return;
    }

    const selectionText = selection.toString().trim();
    // also prevent cross-paragraph selection
    if (selectionText.length === 0 || selectionText.includes("\n")) {
      closePopup();
      return;
    }

    const element =
      range.startContainer instanceof Element
        ? range.startContainer
        : range.startContainer.parentElement;
    const blockId = element?.closest('[data-block="feedback"]')?.id;
    if (!blockId) {
      closePopup();
      return;
    }

    refs.setReference({
      getBoundingClientRect() {
        return range.getBoundingClientRect();
      },
      contextElement: container,
    });

    _setPopup({ mode: "tooltip", range, selection: selectionText, blockId });
  });

  const closeOnEscape = useEffectEvent((event) => {
    if (popup === null) return;
    if (event.key === "Escape") closePopup();
  });

  const closeOnPointerDown = useEffectEvent((event) => {
    const target = event.target;
    if (popup === null || !(target instanceof Node)) return;

    if (
      refs.floating.current?.contains(target) ||
      (popup.mode === "tooltip" && containerRef.current?.contains(target))
    ) {
      return;
    }

    closePopup();
  });

  useEffect(() => {
    let frame = null;

    function scheduleSelectionPopover() {
      if (frame !== null) window.cancelAnimationFrame(frame);

      frame = window.requestAnimationFrame(() => {
        frame = null;
        updateSelectionPopover();
      });
    }

    document.addEventListener("selectionchange", scheduleSelectionPopover);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnPointerDown);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("selectionchange", scheduleSelectionPopover);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="prose-no-margin highlight-fd:bg-fd-primary highlight-fd:text-fd-primary-foreground"
      >
        {children}
      </div>

      {popup && (
        <div
          ref={refs.setFloating}
          className={cn(
            "not-prose z-40 text-sm bg-fd-popover text-fd-popover-foreground border overflow-hidden shadow-lg rounded-xl w-30 h-9.5 box-content transition-[width,height]",
            popup.mode === "expanded"
              ? "w-75 h-32 max-w-[98vw]"
              : "select-none",
          )}
          style={floatingStyles}
        >
          {popup.mode === "tooltip" ? (
            <div className="w-30 h-9.5 p-1">
              <button
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "size-full gap-1.5",
                )}
                onClick={expandPopup}
              >
                <CornerDownRightIcon className="size-4 text-fd-muted-foreground" />
                Feedback
              </button>
            </div>
          ) : (
            <FeedbackTextForm
              blockId={popup.blockId}
              selection={popup.selection}
              onSendAction={onSendAction}
              onClose={closePopup}
              container={{
                className: "p-2 w-[300px] h-32 max-w-[98vw] animate-fd-fade-in",
              }}
            />
          )}
        </div>
      )}
    </>
  );
}

function FeedbackTextForm({
  blockId,
  selection,
  onSendAction,
  onClose,
  container,
}) {
  const pathname = usePathname();
  const { previous, setPrevious } = useSubmissionStorage(
    `${pathname}-${blockId}`,
    (v) => {
      const result = blockFeedbackResult.safeParse(v);
      if (result.success) return result.data;
      return null;
    },
  );
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit(e) {
    startTransition(async () => {
      const feedback = {
        blockId,
        blockBody: selection,
        url: location.href,
        message,
      };

      const response = await onSendAction(feedback);
      setPrevious({
        response,
        ...feedback,
      });
      setMessage("");
    });

    e?.preventDefault();
  }

  if (previous)
    return (
      <div
        {...container}
        className={cn(
          "flex flex-col items-center justify-center gap-2 text-fd-muted-foreground text-center",
          container.className,
        )}
      >
        <p>Thank you for your feedback!</p>
        <div className="flex flex-row items-center gap-2">
          <a
            href={previous.response?.githubUrl}
            rel="noreferrer noopener"
            target="_blank"
            className={cn(
              buttonVariants({
                color: "primary",
              }),
              "text-xs",
            )}
          >
            View on GitHub
          </a>

          <button
            className={cn(
              buttonVariants({
                color: "secondary",
              }),
              "text-xs",
            )}
            onClick={() => {
              setPrevious(null);
            }}
          >
            Submit Again
          </button>
        </div>
      </div>
    );

  return (
    <form
      {...container}
      className={cn("flex flex-col gap-2", container.className)}
      onSubmit={submit}
    >
      <textarea
        autoFocus
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded-lg bg-fd-secondary text-fd-secondary-foreground p-3 resize-none focus-visible:outline-none placeholder:text-fd-muted-foreground"
        placeholder="Leave your feedback..."
        onKeyDown={(e) => {
          if (!e.shiftKey && e.key === "Enter") {
            submit(e);
          }
        }}
      />
      <div className="grid grid-cols-2 gap-2 mt-auto">
        <button
          type="submit"
          className={cn(
            buttonVariants({ variant: "primary", size: "sm" }),
            "gap-1.5",
          )}
          disabled={isPending}
        >
          <CornerDownRightIcon className="size-4" />
          Submit
        </button>
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "gap-1.5",
          )}
          disabled={isPending}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </form>
  );
}

function useSubmissionStorage(key, validate) {
  const storageKey = `docs-feedback-${key}`;
  const [value, setValue] = (useState < Result) | (null > null);
  const validateCallback = useEffectEvent(validate);

  useEffect(() => {
    const item = localStorage.getItem(storageKey);
    if (item === null) return;
    const validated = validateCallback(JSON.parse(item));

    if (validated !== null) setValue(validated);
  }, [storageKey]);

  return {
    previous: value,
    setPrevious(result) {
      if (result) localStorage.setItem(storageKey, JSON.stringify(result));
      else localStorage.removeItem(storageKey);

      setValue(result);
    },
  };
}
