# DotLyric

Turn any lyric snippet into a synced dot-matrix animation. Think concert LED boards meets retro aesthetics.

## Features (v0)

- **Text to dot-matrix**: Paste lyrics and watch them animate in dot-matrix style
- **Customizable parameters**: Adjust grid density, dot size, duration
- **Real-time preview**: See your animation as you tweak settings
- **1080×1080 output**: Instagram-ready square format
- **Silent loops**: Perfect for social media

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Animation**: Canvas API + requestAnimationFrame

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**: Navigate to `http://localhost:3000`

## Usage

1. Go to `/editor`
2. Paste your lyric snippet (max 200 chars)
3. Adjust timing with the duration slider (1-30s)
4. Tweak dot parameters:
   - Grid density (columns × rows)
   - Dot size
   - Invert colors (white bg, black dots)
5. Hit play to preview your animation
6. Export coming soon!

## Roadmap

- [ ] MP4 export via MediaRecorder
- [ ] Audio upload + beat detection
- [ ] Multiple templates (scrolling, ticker)
- [ ] Color palettes
- [ ] Public gallery
- [ ] After Effects export

## License

MIT
