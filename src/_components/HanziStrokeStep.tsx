"use client";

import { useEffect, useMemo, useState } from "react";
import HanziWriter from "hanzi-writer";

type CharData = {
  strokes: string[];
};

type Props = {
  char: string; // Ж: "汉"
  size?: number; // SVG-ийн талын урт (px), default 64
  gap?: number; // алхам хоорондын зай (px), default 8
  showGrid?: boolean; // доторх туслах шугамууд
};

export default function HanziStrokeSteps({
  char,
  size = 100,
  gap = 10,
  showGrid = true,
}: Props) {
  const [data, setData] = useState<CharData | null>(null);

  // ханз өөрчлөгдөх бүрт stroke data уншина
  useEffect(() => {
    let mounted = true;
    HanziWriter.loadCharacterData(char)
      .then((d: any) => {
        if (mounted) setData({ strokes: d.strokes });
      })
      .catch(() => setData(null));
    return () => {
      mounted = false;
    };
  }, [char]);

  const steps = data?.strokes.length ?? 0;

  const cells = useMemo(() => {
    if (!data) return [];
    const sw = Math.max(28, Math.floor(size * 0.5)); // strokeWidth бага зэрэг нимгэн
    const gridStroke = Math.max(2, Math.floor(size * 0.01));

    return Array.from({ length: steps }).map((_, i) => {
      // i-р алхамд өмнөх strokes (саарал) + одоогийн stroke (улаан)
      const prev = data.strokes.slice(0, i);
      const current = data.strokes[i];

      return (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flex: "0 0 auto" }}
        >
          {showGrid && (
            <>
              <rect
                x="8"
                y="8"
                width="1008"
                height="1008"
                fill="none"
                stroke="#93c5fd"
                strokeWidth={gridStroke}
              />
              <line
                x1="512"
                y1="0"
                x2="512"
                y2="1024"
                stroke="#bfdbfe"
                strokeWidth={gridStroke}
                strokeDasharray="24 28"
              />
              <line
                x1="0"
                y1="512"
                x2="1024"
                y2="512"
                stroke="#bfdbfe"
                strokeWidth={gridStroke}
                strokeDasharray="24 28"
              />
            </>
          )}

          {/* өмнөх strokes — саарал */}
          <g
            fill="true"
            stroke="#111827"
            strokeOpacity="1"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="scale(1,-1) translate(0,-1024)"
          >
            {prev.map((d, k) => (
              <path key={k} d={d} />
            ))}
          </g>

          {/* идэвхтэй stroke — улаан */}
          <g
            fill="#ef4444"
            stroke="#ef4444"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="scale(1,-1) translate(0,-1024)"
          >
            <path d={current} />
          </g>
        </svg>
      );
    });
  }, [data, size, steps, showGrid]);

  if (!data) {
    return (
      <div className="flex items-center text-sm text-gray-500">
        {/* <span className="inline-block bg-blue-600 text-white px-2 py-0.5 rounded mr-2">
          Stroke Order
        </span> */}
        loading…
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {/* <p className="inline-block bg-blue-600 text-white px-2 py-0.5 rounded mr-3 whitespace-nowrap">
        Stroke Order
      </p> */}
      <div className="flex flex-wrap" style={{ gap }}>
        {cells}
      </div>
    </div>
  );
}
