import React, { CSSProperties, ReactNode } from "react";

export function Container({ children, style = {} }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", ...style }}>{children}</div>;
}
