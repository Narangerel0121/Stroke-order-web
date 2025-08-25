// "use client";

// import { useEffect, useRef } from "react";
// import HanziWriter from "hanzi-writer";

// export default function HanziPlayer({ char }: { char: string }) {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!ref.current) return;
//     ref.current.innerHTML = ""; // clear previous

//     const writer = HanziWriter.create(ref.current, char, {
//       width: 100,
//       height: 100,
//       padding: 5,
//       showOutline: true,
//       showCharacter: false,
//       strokeAnimationSpeed: 1,
//       delayBetweenStrokes: 200,
//     });

//     writer.animateCharacter();
//   }, [char]);

//   return <div ref={ref}></div>;
// }


"use client";

import { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";

export default function HanziPlayer({ char }: { char: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = ""; // clear previous

    const writer = HanziWriter.create(ref.current, char, {
      width: 100,
      height: 100,
      padding: 5,
      showOutline: true,
      showCharacter: false,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 200,
    });

    const loop = () => {
      writer.animateCharacter().then(() => {
        // wait a bit before restarting (optional)
        setTimeout(loop, 500);
      });
    };

    loop();
  }, [char]);

  return <div ref={ref}></div>;
}



