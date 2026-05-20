# Agent Notes

This project is a React + Vite web presentation template for minimal academic, technical, and research-oriented talks.

## Presentation Design Principles

- Keep each slide layout visually centered as a whole, both horizontally and vertically.
- Keep typography, spacing, and visual treatment as consistent as possible across slides.
- Avoid overloading a slide with too much text or too many cards; keep information focused and concise.
- Add spaces between Chinese and English text for better readability.
- Do not use sentence-ending punctuation in list environments.
- Do not use subtitles or section headings; each slide should only have one page title.
- This project is not a PPT/PPTX file; do not use the Presentations skill for this project.

## Entry Points

- `index.html`: Vite HTML entry.
- `src/main.jsx`: React mount entry.
- `src/App.jsx`: Main application component. It owns theme state, language state, current slide state, keyboard navigation, and the PDF export trigger.

## Directory Structure

```text
src/
  components/
  content/
  presentation/
  styles/
```

## `src/presentation/`

This is the presentation framework layer. It owns the slide shell, scaling, navigation, export flow, and shared visual identity.

- `constants.js`: Defines the fixed design canvas size, currently `1920 × 1080`.
- `SlideViewer.jsx`: Browser preview container. It measures the available viewport and scales the whole slide canvas proportionally.
- `SlideFrame.jsx`: Shared slide frame. It contains the 16:9 canvas, top-right abstract mark, page number, and bottom green identity line.
- `Toolbar.jsx`: Top toolbar with previous/next navigation, Light/Dark theme switching, Chinese/English switching, and Export PDF.
- `ExportDeck.jsx`: Hidden full-deck renderer used by PDF export.
- `exportPdf.js`: Clones each slide into a temporary render stage, converts it to JPG with `html2canvas`, then combines the images into a PDF with `jspdf`.

## PDF Export Notes

- Avoid modern CSS color functions in export-visible pseudo-elements because `html2canvas` cannot reliably parse computed values such as `color(srgb ...)`; use `rgb(...)`, `rgba(...)`, or hex instead.
- Avoid small standalone SVG connector graphics in export-visible slide content because `html2canvas` may drop them during PDF export; prefer full-region SVG overlays with paths positioned in the shared viewBox

## `src/content/`

This is the slide content layer. It owns the concrete slide pages and their copy.

- `slides.jsx`: Slide registry. It controls slide order, slide titles, slide type, and the component used for each slide.
- `slides/OverviewSlide.jsx`: Cover slide example.
- `slides/KeyPointsSlide.jsx`: Content slide example with bullets, a table, a code block, a quote block, and a formula block.
- `slides/ArchitectureSlide.jsx`: Complex diagram slide example with a system architecture diagram.

To add a new slide, create a component in `src/content/slides/`, then register it in `src/content/slides.jsx`.

## `src/components/`

This is the reusable content component layer.

- `Typography.jsx`: Slide title, section title, and highlighted text components.
- `Blocks.jsx`: Bullet list, info card, data table, code block, quote block, and math formula components.
- `ArchitectureDiagram.jsx`: Example complex system diagram built with React, CSS, and lightweight SVG connectors.

## `src/styles/`

- `global.css`: Global styles, theme variables, slide layout, reusable block styling, top-right abstract mark styling, and export canvas styling.

Theme styling is mainly controlled through CSS variables:

```css
:root {
  --accent: #1fa464;
  --canvas-bg: #ffffff;
  --text: #1a1f1d;
}

:root[data-theme="dark"] {
  --accent: #49c684;
  --canvas-bg: #171a18;
  --text: #eff4ef;
}
```

## Layer Boundaries

- Presentation layer: `src/presentation/`. Handles canvas size, scaling, theme shell, navigation, page number, export flow, and bottom green line.
- Content layer: `src/content/`. Handles individual slide structure and copy.
- Component layer: `src/components/`. Handles reusable blocks and complex visual components.

When extending the deck, prefer adding new slides in the content layer and extracting reusable blocks into the component layer. Avoid putting page-specific content into `src/presentation/`.

## Common Commands

```bash
npm install
npm run dev
npm run build
```

The local development URL is usually:

```text
http://localhost:5173
```
