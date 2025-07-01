export interface DotMatrixConfig {
  gridCols: number;
  gridRows: number;
  dotRadius: number;
  invertBackground: boolean;
  canvasWidth: number;
  canvasHeight: number;
}

export interface AnimationFrame {
  frameIndex: number;
  totalFrames: number;
  revealProgress: number;
  displayText: string;
}

export class DotMatrixEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offscreenCanvas: HTMLCanvasElement;
  private offscreenCtx: CanvasRenderingContext2D;
  private config: DotMatrixConfig;

  constructor(canvas: HTMLCanvasElement, config: DotMatrixConfig) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.config = config;

    // Set canvas size to 1080x1080 for Instagram-ready output
    this.canvas.width = config.canvasWidth;
    this.canvas.height = config.canvasHeight;

    // Create offscreen canvas for text rasterization
    this.offscreenCanvas = document.createElement("canvas");
    this.offscreenCanvas.width = config.gridCols;
    this.offscreenCanvas.height = config.gridRows;
    this.offscreenCtx = this.offscreenCanvas.getContext("2d")!;
  }

  updateConfig(config: Partial<DotMatrixConfig>) {
    this.config = { ...this.config, ...config };
    if (config.canvasWidth || config.canvasHeight) {
      this.canvas.width = this.config.canvasWidth;
      this.canvas.height = this.config.canvasHeight;
    }
    if (config.gridCols || config.gridRows) {
      this.offscreenCanvas.width = this.config.gridCols;
      this.offscreenCanvas.height = this.config.gridRows;
    }
  }

  // Smooth easing function for text reveal
  private smoothstep(edge0: number, edge1: number, x: number): number {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3.0 - 2.0 * t);
  }

  // Rasterize text to boolean grid
  private rasterizeText(text: string): boolean[][] {
    const { gridCols, gridRows } = this.config;

    // Clear offscreen canvas
    this.offscreenCtx.clearRect(0, 0, gridCols, gridRows);

    // Set up text rendering
    this.offscreenCtx.fillStyle = "white";
    this.offscreenCtx.textAlign = "center";
    this.offscreenCtx.textBaseline = "middle";

    // Calculate font size to fit text in grid
    let fontSize = Math.min(gridRows / 4, (gridCols / text.length) * 1.2);
    fontSize = Math.max(1, fontSize);

    this.offscreenCtx.font = `${fontSize}px monospace`;

    // Draw text
    this.offscreenCtx.fillText(text, gridCols / 2, gridRows / 2);

    // Get image data and convert to boolean grid
    const imageData = this.offscreenCtx.getImageData(0, 0, gridCols, gridRows);
    const grid: boolean[][] = [];

    for (let y = 0; y < gridRows; y++) {
      grid[y] = [];
      for (let x = 0; x < gridCols; x++) {
        const index = (y * gridCols + x) * 4;
        const alpha = imageData.data[index + 3];
        grid[y][x] = alpha > 128; // threshold for dot visibility
      }
    }

    return grid;
  }

  // Render a single frame
  renderFrame(frameData: AnimationFrame, lyrics: string) {
    const {
      gridCols,
      gridRows,
      dotRadius,
      invertBackground,
      canvasWidth,
      canvasHeight,
    } = this.config;

    // Calculate character reveal based on progress
    const revealProgress = this.smoothstep(0, 1, frameData.revealProgress);
    const charIndex = Math.floor(revealProgress * lyrics.length);
    const displayText = lyrics.slice(0, charIndex);

    // Clear canvas
    this.ctx.fillStyle = invertBackground ? "white" : "black";
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (displayText.length === 0) return;

    // Rasterize current text
    const dotMask = this.rasterizeText(displayText);

    // Calculate dot spacing
    const cellWidth = canvasWidth / gridCols;
    const cellHeight = canvasHeight / gridRows;

    // Draw dots
    this.ctx.fillStyle = invertBackground ? "black" : "white";

    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        if (dotMask[y][x]) {
          const centerX = (x + 0.5) * cellWidth;
          const centerY = (y + 0.5) * cellHeight;

          this.ctx.beginPath();
          this.ctx.arc(centerX, centerY, dotRadius, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }

  // Generate all frames for the animation
  generateFrames(
    lyrics: string,
    duration: number,
    frameRate: number = 30
  ): AnimationFrame[] {
    const totalFrames = Math.floor(duration * frameRate);
    const frames: AnimationFrame[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const progress = i / (totalFrames - 1);
      frames.push({
        frameIndex: i,
        totalFrames,
        revealProgress: progress,
        displayText: lyrics.slice(0, Math.floor(progress * lyrics.length)),
      });
    }

    return frames;
  }
}
