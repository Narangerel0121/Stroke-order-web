"use client";
import React from "react";

type Props = {
  char: string;
  lines: number;
  cellsPerLine: number;
  cellSizeMM: number;
  ghostsPerLine: number;
  emptyRowsAtEnd: number;
};

export default function WorkSheetGrid({
  char,
  lines,
  cellsPerLine,
  cellSizeMM,
  ghostsPerLine,
  emptyRowsAtEnd,
}: Props) {
  const totalLines = lines + emptyRowsAtEnd;

  return (
    <div
      className="worksheet-grid"
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${totalLines}, ${cellSizeMM}mm)`,
        gridTemplateColumns: `repeat(${cellsPerLine}, ${cellSizeMM}mm)`,
      }}
    >
      {Array.from({ length: totalLines * cellsPerLine }).map((_, i) => {
        const row = Math.floor(i / cellsPerLine);
        const col = i % cellsPerLine;
        let showGhost = row < lines && col < ghostsPerLine;

        return (
          <div
            key={i}
            className="cell relative flex items-center justify-center text-gray-400"
            style={{
              border: "0.5px solid #3b82f6",
              fontSize: `${cellSizeMM * 0.7}mm`,
              color: showGhost ? "rgba(0,0,0,0.25)" : "transparent",
              fontFamily: `"KaiTi","STKaiti","AR PL UKai CN","serif"`,
            }}
          >
            {showGhost ? char : char}
          </div>
        );
      })}
      <style jsx>{`
        .worksheet-grid {
          margin-bottom: 1rem;
        }
        .cell {
          position: relative;
        }
        .cell::before,
        .cell::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          border-left: 0.3px dashed #60a5fa;
        }
        .cell::after {
          left: 0;
          right: 0;
          top: 50%;
          border-top: 0.3px dashed #60a5fa;
          border-left: none;
        }
      `}</style>
    </div>
  );
}

