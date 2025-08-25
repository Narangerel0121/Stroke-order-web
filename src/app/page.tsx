"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HanziPlayer from "@/_components/HanziPlayer";
import Link from "next/link";

export default function HomePage() {
  const [text, setText] = useState("");
  const [chars, setChars] = useState<string[]>([]);

  const handleSearch = () => {
    // extract only CJK Unified Ideographs (U+4E00 – U+9FFF)
    const onlyHanzi = Array.from(text).filter((ch) =>
      /[\u4e00-\u9fff]/.test(ch)
    );
    setChars(onlyHanzi);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
       <div className="flex justify-between">
         <h1 className="text-2xl font-bold">Stroke order animation</h1>
          <Link href="/sheet"><Button className="bg-blue-500 hover:bg-blue-500 cursor-pointer">Get printable practice sheet</Button></Link>
       </div>

        <div className="flex gap-2">
          <Input
            placeholder="输入汉字，例如: 我爱你"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleSearch} className="cursor-pointer">搜索</Button>
        </div>

        {chars.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {chars.map((char, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center bg-white shadow rounded-lg p-4"
              >
                <span className="mb-2 text-xl font-medium">{char}</span>
                <HanziPlayer char={char} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
