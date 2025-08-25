"use client";
import { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";

export default function HanziPlayer({ char }: { char: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";
    const writer = HanziWriter.create(ref.current, char, {
      width: 120,
      height: 120,
      padding: 5,
      showOutline: true,
      showCharacter: false,
    });
    writer.animateCharacter();
  }, [char]);

  return <div ref={ref}></div>;
}
