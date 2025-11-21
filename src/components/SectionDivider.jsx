import React from "react";

// A 1px tall gradient rule that fades out at the edges
export function DividerHairline() {
  return (
    <div
      aria-hidden="true"
      className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700"
    />
  );
}
