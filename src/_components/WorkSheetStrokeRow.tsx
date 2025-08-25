// "use client";
// import HanziWriter from "hanzi-writer";
// import { useEffect, useRef } from "react";

// export default function WorkSheetStrokeRow({
//   char,
//   size = 50,
//   gap = 8,
// }: {
//   char: string;
//   size?: number;
//   gap?: number;
// }) {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;
//     containerRef.current.innerHTML = "";

//     // Load hanzi stroke order step by step
//     const writer = HanziWriter.create(containerRef.current, char, {
//       width: size,
//       height: size,
//       padding: 2,
//       strokeAnimationSpeed: 1,
//       delayBetweenStrokes: 300,
//       showCharacter: true,
//       showOutline: true,
//       showHintAfterMisses: 0,
//     });

//     writer.quiz(); // will show stroke-by-stroke static
//   }, [char, size]);

//   return (
//     <div className="flex" style={{ gap }}>
//       <div ref={containerRef} className="flex"></div>
//     </div>
//   );
// }

"use client";
import HanziWriter from "hanzi-writer";
import { useEffect, useRef } from "react";
import HanziStrokeSteps from "./HanziStrokeStep";

export default function WorkSheetStrokeRow({
  char,
  size = 50,
  gap = 8,
}: {
  char: string;
  size?: number;
  gap?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const writer = HanziWriter.create(containerRef.current, char, {
      width: size,
      height: size,
      padding: 2,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 300,
      showCharacter: true,
      showOutline: true,
      showHintAfterMisses: 0,
    });

    writer.quiz();
  }, [char, size]);

  return (
    <div className="flex items-start" style={{ gap }}>
      {/* HanziWriter (амьд animation/quiz) */}
      <div ref={containerRef} className="flex"></div> {/*urd garj ireed baigaashd*/}

      {/* Хажууд нь алхам алхмаар static snapshot */}
      <HanziStrokeSteps char={char} size={size} />
    </div>
  );
}

