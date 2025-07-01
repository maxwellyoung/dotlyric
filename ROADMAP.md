# DotLyric Roadmap

> From MVP to viral lyric-animation platform

---

## ✅ Phase 0: MVP Foundation (SHIPPED)

_Status: Complete - Ready for first tweets_

### Core Features

- [x] **Text input** - 200 char lyric snippets
- [x] **Dot-matrix engine** - Custom Canvas API renderer
- [x] **Real-time preview** - Smooth 30fps animation
- [x] **Parameter controls** - Grid density, dot size, duration, invert
- [x] **1080x1080 output** - Instagram-ready format
- [x] **Clean UI** - Hacker-aesthetic with Recursive font
- [x] **Responsive design** - Works on desktop & mobile

### Tech Stack

- [x] Next.js 14 + TypeScript
- [x] Tailwind CSS for styling
- [x] Zustand for state management
- [x] Canvas API for rendering
- [x] Vercel/Cloudflare Pages ready

**Demo ready**: `"i dont need another"` → dot-matrix magic ✨

---

## 🚧 Phase 1: Export & Share (Next 2 weeks)

_Goal: Make it actually useful for creators_

### High Priority

- [ ] **MP4 Export**
  - MediaRecorder API for client-side recording
  - Canvas.captureStream() → MP4 blob
  - Fallback: Server-side FFmpeg worker
- [ ] **File management**
  - Download MP4 directly
  - Cloudflare R2 for temporary storage
  - Presigned URLs for uploads
- [ ] **Social optimization**
  - Twitter card meta tags
  - Open Graph previews
  - Copy-paste embed codes

### Nice to Have

- [ ] **Export options**
  - WebM with transparency
  - GIF fallback (optimized)
  - Different aspect ratios (16:9, 9:16)
- [ ] **Basic analytics**
  - Plausible.io integration
  - Export count tracking

**Success metric**: First viral TikTok using DotLyric export

---

## 🎵 Phase 2: Audio Integration (Weeks 3-4)

_Goal: Real music sync, not just timing_

### Core Audio Features

- [ ] **Audio upload** (MP3, WAV support)
- [ ] **Beat detection**
  - Web Audio API analysis
  - Tempo extraction
  - Beat grid visualization
- [ ] **Lyric sync**
  - Manual timestamp adjustment
  - LRC/SRT file import
  - Visual waveform editor

### Advanced Sync

- [ ] **Auto-timing suggestions**
  - ML-powered lyric timing
  - BPM-based text reveal
- [ ] **Audio preview**
  - Muted by default (copyright safe)
  - Waveform visualization only
- [ ] **Export with audio**
  - User-provided audio only
  - Copyright disclaimers

**Success metric**: 10+ creators using audio sync weekly

---

## 🎨 Phase 3: Visual Expansion (Month 2)

_Goal: Beyond basic dots - multiple styles_

### Animation Templates

- [ ] **Scrolling marquee** - Text flows left/right
- [ ] **Vertical ticker** - Text drops down
- [ ] **Typewriter mode** - Letter-by-letter reveal
- [ ] **Pulse effects** - Dots grow/shrink to beat
- [ ] **Matrix rain** - Character cascade effect

### Color & Style

- [ ] **Color palettes**
  - Album art dominant colors (Vibrant.js)
  - Preset color schemes
  - Custom hex input
- [ ] **Dot variations**
  - Square pixels
  - Custom shapes (★, ♪, etc.)
  - Gradient fills
- [ ] **Background options**
  - Solid colors
  - Simple gradients
  - Noise textures

**Success metric**: 5 distinct visual styles in use

---

## 🌍 Phase 4: Community & Discovery (Month 3)

_Goal: Viral loop through remixing_

### Public Gallery

- [ ] **Featured animations**
  - Curated homepage gallery
  - Trending/recent tabs
  - Search by lyrics/artist
- [ ] **User accounts**
  - Magic link auth (no passwords)
  - Personal animation library
  - Like/save favorites

### Social Features

- [ ] **Remix button**
  - Fork existing animations
  - Credit original creators
  - Remix chains visualization
- [ ] **Sharing improvements**
  - Direct social posting
  - Embed player widget
  - QR codes for mobile sharing

### Curation

- [ ] **Admin dashboard**
  - Feature/hide animations
  - Content moderation tools
  - Usage analytics
- [ ] **Creator highlights**
  - Weekly featured creators
  - Interview/spotlight blog

**Success metric**: 1000+ public animations, 100+ daily remixes

---

## ⚡ Phase 5: Pro Features (Month 4+)

_Goal: Monetization for power users_

### Advanced Export

- [ ] **After Effects integration**
  - JSON export for motion graphics
  - Keyframe data export
  - Layer composition
- [ ] **Batch processing**
  - Multiple lyrics → multiple videos
  - CSV import for lyric lists
  - Scheduled exports

### Pro Tools

- [ ] **Custom fonts**
  - User font uploads
  - Google Fonts integration
  - Bitmap font support
- [ ] **Advanced timing**
  - Keyframe editor
  - Easing curve controls
  - Multi-layer animations
- [ ] **Brand tools**
  - Logo watermarks
  - Custom color branding
  - White-label exports

### Business Model

- [ ] **Freemium tiers**
  - Free: 3 exports/day, watermark
  - Pro: Unlimited, no watermark, $9/mo
  - Team: Multi-user, analytics, $29/mo

**Success metric**: $10k MRR, 500+ pro subscribers

---

## 🚀 Future Ideas (6+ months)

_Blue sky thinking_

### Platform Expansion

- [ ] **Mobile app** (React Native)
- [ ] **Desktop app** (Electron)
- [ ] **Browser extension** (quick social media creation)

### AI Integration

- [ ] **Lyric generation** (GPT integration)
- [ ] **Auto-styling** (AI picks colors/animations)
- [ ] **Voice-to-lyrics** (speech recognition)

### Platform Features

- [ ] **Live performance mode** (real-time lyrics display)
- [ ] **Hardware integration** (actual LED matrix control)
- [ ] **AR filters** (TikTok/Instagram integration)

---

## 📊 Success Metrics by Phase

| Phase | Timeline    | Key Metric     | Target          |
| ----- | ----------- | -------------- | --------------- |
| 0     | ✅ Complete | Working MVP    | Ship it         |
| 1     | 2 weeks     | Daily exports  | 100/day         |
| 2     | 4 weeks     | Audio users    | 50/week         |
| 3     | 8 weeks     | Template usage | 5 styles live   |
| 4     | 12 weeks    | Community size | 1000 animations |
| 5     | 16 weeks    | Revenue        | $10k MRR        |

---

## 🎯 Immediate Next Steps

1. **This week**: MP4 export implementation
2. **Week 2**: Cloudflare R2 integration + social sharing
3. **Week 3**: First audio upload prototype
4. **Week 4**: Beat detection MVP

---

## 💡 Decision Framework

**Ship if**:

- Takes <1 week to implement
- Directly increases exports/shares
- Reduces user friction

**Punt if**:

- Complex auth/user management
- Copyright/legal complications
- Feature bloat without clear user demand

**Kill if**:

- No usage after 2 weeks
- Too expensive to maintain
- Distracts from core loop

---

_Last updated: Phase 0 complete, ready for Phase 1 🚀_
