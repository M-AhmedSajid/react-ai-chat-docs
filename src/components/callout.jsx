"use client";

import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

const variantStyles = {
  info: {
    container:
      "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    icon: Info,
  },
  warning: {
    container:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    icon: AlertTriangle,
  },
  success: {
    container:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    icon: CheckCircle,
  },
  error: {
    container:
      "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    icon: XCircle,
  },
};

export function Callout({ children, type = "info", title }) {
  const currentVariant = variantStyles[type] || variantStyles.info;
  const IconComponent = currentVariant.icon;

  return (
    <div
      className={`my-4 flex gap-3 rounded-lg border p-4 text-sm ${currentVariant.container}`}
    >
      <IconComponent className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="space-y-1">
        {title && <h5 className="font-semibold leading-none">{title}</h5>}
        <div className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
