import { useEditorStore } from "@/store/editor";

export default function ControlPanel() {
  const {
    lyrics,
    duration,
    gridCols,
    gridRows,
    dotRadius,
    invertBackground,
    maxChars,
    setLyrics,
    setDuration,
    setGridCols,
    setGridRows,
    setDotRadius,
    setInvertBackground,
    resetEditor,
  } = useEditorStore();

  return (
    <div className="space-y-8">
      {/* Lyrics Input */}
      <div>
        <label className="block text-sm font-medium mb-2">
          spit bars ({lyrics.length}/{maxChars})
        </label>
        <textarea
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="paste your lyric snippet here..."
          className="w-full h-32 bg-gray-900 border border-gray-700 rounded-lg p-4 text-white font-mono text-sm resize-none focus:border-gray-500 focus:outline-none"
          maxLength={maxChars}
        />
      </div>

      {/* Duration Slider */}
      <div>
        <label className="block text-sm font-medium mb-2">
          duration: {duration}s
        </label>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="control-slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1s</span>
          <span>30s</span>
        </div>
      </div>

      {/* Grid Density */}
      <div>
        <label className="block text-sm font-medium mb-2">
          grid density: {gridCols}×{gridRows}
        </label>
        <div className="space-y-3">
          <div>
            <span className="text-xs text-gray-400">columns: {gridCols}</span>
            <input
              type="range"
              min="32"
              max="128"
              step="8"
              value={gridCols}
              onChange={(e) => setGridCols(Number(e.target.value))}
              className="control-slider"
            />
          </div>
          <div>
            <span className="text-xs text-gray-400">rows: {gridRows}</span>
            <input
              type="range"
              min="16"
              max="64"
              step="4"
              value={gridRows}
              onChange={(e) => setGridRows(Number(e.target.value))}
              className="control-slider"
            />
          </div>
        </div>
      </div>

      {/* Dot Radius */}
      <div>
        <label className="block text-sm font-medium mb-2">
          dot size: {dotRadius}px
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          value={dotRadius}
          onChange={(e) => setDotRadius(Number(e.target.value))}
          className="control-slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>tiny</span>
          <span>chunky</span>
        </div>
      </div>

      {/* Invert Background */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="invert"
          checked={invertBackground}
          onChange={(e) => setInvertBackground(e.target.checked)}
          className="w-4 h-4 bg-gray-900 border-gray-700 rounded focus:ring-0"
        />
        <label htmlFor="invert" className="text-sm font-medium cursor-pointer">
          invert (white bg, black dots)
        </label>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetEditor}
        className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
      >
        reset all
      </button>
    </div>
  );
}
