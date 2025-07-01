import { useRef, useEffect, useState, RefObject } from "react";
import { useEditorStore } from "@/store/editor";
import { DotMatrixEngine, AnimationFrame } from "@/lib/dotMatrix";

interface CanvasPreviewProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  engine: DotMatrixEngine | null;
}

export default function CanvasPreview({
  canvasRef,
  engine,
}: CanvasPreviewProps) {
  const {
    lyrics,
    duration,
    isPlaying,
    currentFrame,
    setIsPlaying,
    setCurrentFrame,
  } = useEditorStore();
  const [frames, setFrames] = useState<AnimationFrame[]>([]);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  // Generate frames when lyrics or duration changes
  useEffect(() => {
    if (engine && lyrics.trim()) {
      const newFrames = engine.generateFrames(lyrics.trim(), duration, 30);
      setFrames(newFrames);
      setCurrentFrame(0);
    } else {
      setFrames([]);
      setCurrentFrame(0);
    }
  }, [lyrics, duration, engine]);

  // Animation loop
  useEffect(() => {
    if (isPlaying && frames.length > 0 && engine) {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const elapsed = (timestamp - startTimeRef.current) / 1000;
        const frameIndex = Math.floor((elapsed / duration) * frames.length);

        if (frameIndex < frames.length) {
          const frame = frames[frameIndex];
          engine.renderFrame(frame, lyrics.trim());
          setCurrentFrame(frameIndex);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete - loop or stop
          startTimeRef.current = timestamp;
          const frame = frames[0];
          engine.renderFrame(frame, lyrics.trim());
          setCurrentFrame(0);
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = undefined;
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, frames, duration, lyrics, engine]);

  // Render static frame when not playing
  useEffect(() => {
    if (!isPlaying && frames.length > 0 && engine) {
      const frame = frames[currentFrame] || frames[0];
      engine.renderFrame(frame, lyrics.trim());
    }
  }, [currentFrame, frames, lyrics, engine, isPlaying]);

  // Render empty state when no lyrics
  useEffect(() => {
    if (!lyrics.trim() && engine && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")!;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 1080, 1080);
    }
  }, [lyrics, engine, canvasRef]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFrameSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const frameIndex = Number(e.target.value);
    setCurrentFrame(frameIndex);
    setIsPlaying(false);
  };

  const canPreview = lyrics.trim().length > 0;
  const progress =
    frames.length > 0 ? (currentFrame / (frames.length - 1)) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Canvas Container */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        <div className="aspect-square max-w-md mx-auto">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
            style={{
              imageRendering: "pixelated",
            }}
          />
        </div>

        {!canPreview && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500 text-sm">enter lyrics to preview</p>
          </div>
        )}
      </div>

      {/* Playback Controls */}
      {canPreview && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              {isPlaying ? "⏸️" : "▶️"}
            </button>

            <div className="flex-1">
              <input
                type="range"
                min="0"
                max={Math.max(0, frames.length - 1)}
                value={currentFrame}
                onChange={handleFrameSeek}
                className="control-slider"
              />
            </div>

            <div className="flex-shrink-0 text-xs text-gray-400 font-mono">
              {Math.round(progress)}%
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>
              frame {currentFrame + 1}/{frames.length}
            </span>
            <span>•</span>
            <span>{duration}s loop</span>
            <span>•</span>
            <span>1080×1080</span>
          </div>

          {/* Export Button */}
          <button
            className="w-full py-3 px-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
            onClick={() => {
              // TODO: Implement export functionality
              alert(
                "Export coming soon! For now, right-click the canvas to save."
              );
            }}
          >
            dotify → export mp4
          </button>
        </div>
      )}
    </div>
  );
}
