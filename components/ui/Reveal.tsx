"use client";

import React, { useEffect, useRef, useState, CSSProperties, ElementType, ReactNode } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible] as const;
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  style?: CSSProperties;
  id?: string;
  className?: string;
  href?: string;
}

export function Reveal({ children, delay = 0, as: Tag = "div", style = {}, ...props }: RevealProps) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
