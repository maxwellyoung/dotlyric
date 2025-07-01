import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useEditorStore } from "@/store/editor";
import { DotMatrixEngine, DotMatrixConfig } from "@/lib/dotMatrix";
import ControlPanel from "@/components/ControlPanel";
import CanvasPreview from "@/components/CanvasPreview";

export default function Editor() {
  const store = useEditorStore();
  const [engine, setEngine] = useState<DotMatrixEngine | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize the dot matrix engine
  useEffect(() => {
    if (canvasRef.current && !engine) {
      const config: DotMatrixConfig = {
        gridCols: store.gridCols,
        gridRows: store.gridRows,
        dotRadius: store.dotRadius,
        invertBackground: store.invertBackground,
        canvasWidth: 1080,
        canvasHeight: 1080,
      };

      const newEngine = new DotMatrixEngine(canvasRef.current, config);
      setEngine(newEngine);
    }
  }, [canvasRef.current]);

  // Update engine config when store changes
  useEffect(() => {
    if (engine) {
      engine.updateConfig({
        gridCols: store.gridCols,
        gridRows: store.gridRows,
        dotRadius: store.dotRadius,
        invertBackground: store.invertBackground,
      });
    }
  }, [
    engine,
    store.gridCols,
    store.gridRows,
    store.dotRadius,
    store.invertBackground,
  ]);

  return (
    <>
      <Head>
        <title>Editor - DotLyric</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="border-b border-gray-800 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Dot<span className="text-gray-400">Lyric</span>
            </Link>
            <div className="text-sm text-gray-400">v0 • silent loops only</div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <ControlPanel />
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <CanvasPreview canvasRef={canvasRef} engine={engine} />
          </div>
        </div>
      </main>
    </>
  );
}
