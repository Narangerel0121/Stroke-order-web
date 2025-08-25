// "use client";

// import { useMemo, useRef, useState } from "react";
// import dynamic from "next/dynamic";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import jsPDF from "jspdf";

// const WorksheetStrokeRow = dynamic(
//   () => import("@/_components/WorkSheetStrokeRow"),
//   { ssr: false }
// );
// const WorksheetGrid = dynamic(() => import("@/_components/WorkSheetGrid"), {
//   ssr: false,
// });

// type Item = { char: string; lines: number };

// function parseSpec(spec: string): Item[] {
//   // format: 我:2, 和:3, 汉:1
//   const out: Item[] = [];
//   for (const raw of spec.split(/[,，]+/).map((s) => s.trim()).filter(Boolean)) {
//     const m = raw.match(/^([\u4e00-\u9fff])[:：]?\s*(\d+)?$/);
//     if (m) out.push({ char: m[1], lines: Math.max(1, Number(m[2] ?? 1)) });
//   }
//   return out;
// }

// export default function WorksheetPage() {
//   const [spec, setSpec] = useState("我:2, 和:3, 汉:1");
//   const items = useMemo(() => parseSpec(spec), [spec]);
//   const sheetRef = useRef<HTMLDivElement>(null);

//   const onPrint = () => window.print();

//   const onDownloadPDF = async () => {
//     const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
//     await doc.html(sheetRef.current as HTMLElement, {
//       x: 10,
//       y: 10,
//       width: 190,
//       html2canvas: { scale: 0.8, useCORS: true },
//       callback: (doc) => doc.save("hanzi-worksheet.pdf"),
//     });
//   };

//   return (
//     <main className="min-h-screen bg-gray-50">
//       {/* Controls */}
//       <div className="max-w-4xl mx-auto p-6 space-y-4 no-print">
//         <h1 className="text-2xl font-bold">汉字 Writing Practice</h1>
//         <Textarea
//           value={spec}
//           onChange={(e) => setSpec(e.target.value)}
//           placeholder="Ж: 我:2, 和:3, 汉:1"
//         />
//         <div className="flex gap-2">
//           <Button onClick={onPrint}>🖨 Print</Button>
//           <Button variant="outline" onClick={onDownloadPDF}>
//             ⬇️ Download PDF
//           </Button>
//         </div>
//       </div>

//       {/* Printable A4 sheet */}
//       <div
//         ref={sheetRef}
//         className="bg-white mx-auto my-6 p-6 space-y-12 sheet-a4"
//       >
//         <h2 className="text-center text-3xl font-semibold mb-2">
//           汉字 Writing Practice
//         </h2>

//         {items.map((it) => (
//           <section key={it.char} className="break-inside-avoid">
//             {/* Stroke order row */}
//             <div className="mb-4">
//               <WorksheetStrokeRow char={it.char} size={60} gap={8} />
//             </div>

//             {/* Practice grid */}
//             <WorksheetGrid
//               char={it.char}
//               lines={it.lines}
//               cellsPerLine={10}
//               cellSizeMM={18}
//               ghostsPerLine={8}
//             />
//           </section>
//         ))}
//       </div>

//       {/* print styles */}
//       <style jsx global>{`
//         .sheet-a4 {
//           width: 210mm;
//           min-height: 297mm;
//           box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
//         }
//         .break-inside-avoid {
//           break-inside: avoid;
//           page-break-inside: avoid;
//         }
//         @media print {
//           @page {
//             size: A4;
//             margin: 12mm;
//           }
//           body {
//             -webkit-print-color-adjust: exact;
//             print-color-adjust: exact;
//           }
//           .no-print {
//             display: none !important;
//           }
//           .sheet-a4 {
//             box-shadow: none !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             width: auto !important;
//             min-height: auto !important;
//           }
//         }
//       `}</style>
//     </main>
//   );
// }



"use client";

import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import jsPDF from "jspdf";

const WorksheetStrokeRow = dynamic(
  () => import("@/_components/WorkSheetStrokeRow"),
  { ssr: false }
);
const WorksheetGrid = dynamic(() => import("@/_components/WorkSheetGrid"), {
  ssr: false,
});

type Item = { char: string; lines: number };

function parseSpec(spec: string): Item[] {
  const out: Item[] = [];
  for (const raw of spec.split(/[,，]+/).map((s) => s.trim()).filter(Boolean)) {
    const m = raw.match(/^([\u4e00-\u9fff])[:：]?\s*(\d+)?$/);
    if (m) out.push({ char: m[1], lines: Math.max(1, Number(m[2] ?? 1)) });
  }
  return out;
}

export default function WorksheetPage() {
  const [spec, setSpec] = useState("很:3, 汉:2");
  const items = useMemo(() => parseSpec(spec), [spec]);
  const sheetRef = useRef<HTMLDivElement>(null);

  const onPrint = () => window.print();

//   const onDownloadPDF = async () => {
//     const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
//     await doc.html(sheetRef.current as HTMLElement, {
//       x: 10,
//       y: 10,
//       width: 190,
//       html2canvas: { scale: 0.8, useCORS: true },
//       callback: (doc) => doc.save("hanzi-worksheet.pdf"),
//     });
//   };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Controls */}
      <div className="max-w-4xl mx-auto p-6 space-y-4 no-print">
        <h1 className="text-2xl font-bold">汉字 Writing Practice</h1>
        <Textarea
          value={spec}
          onChange={(e) => setSpec(e.target.value)}
          placeholder="Жишээ нь: 我:2, 和:3, 汉:1"
        />
        <div className="flex gap-2">
          <Button onClick={onPrint}>🖨 Print</Button>
          {/* <Button variant="outline" onClick={onDownloadPDF}>
            ⬇️ Download PDF
          </Button> */}
        </div>
      </div>

      {/* Printable Sheet */}
      <div
        ref={sheetRef}
        className="bg-white mx-auto my-6 p-6 space-y-12 sheet-a4"
      >
        <h2 className="text-center text-3xl font-semibold mb-10">
          汉字 Writing Practice
        </h2>

        {items.map((it) => (
          <section key={it.char} className="break-inside-avoid">
            {/* Stroke order row */}
            <div className="mb-4">
              <WorksheetStrokeRow char={it.char} size={48} gap={10} />
            </div>

            {/* Grid practice */}
            <WorksheetGrid
              char={it.char}
              lines={it.lines}
              cellsPerLine={10}
              cellSizeMM={18}
              ghostsPerLine={6}
              emptyRowsAtEnd={2}
            />
          </section>
        ))}
      </div>

      {/* print styles */}
      <style jsx global>{`
        .sheet-a4 {
          width: 210mm;
          min-height: 297mm;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
        }
        .break-inside-avoid {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        .no-print {
          display: block;
        }
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .sheet-a4 {
            box-shadow: none;
            margin: 0;
            padding: 0;
            width: auto;
            min-height: auto;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}

