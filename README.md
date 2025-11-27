## Hikaya – Personalized Story Generator

Hikaya is a Next.js 16 application that helps parents or educators generate personalized children’s stories—including multiple output formats and optional audio narration—by collecting child-specific inputs such as age, friends, interests, and desired morals.

### Key Features
- Guided story-generation wizard with multi-step layouts and contextual helpers
- Story preview editor with per-page carousel, edit/save workflow, and audio playback
- Server actions that proxy AI-generated story text and on-demand audio from the Render backend
- Reusable UI primitives built on Radix UI and Tailwind CSS 4

---

## Tech Stack & Dependencies
- **Framework:** Next.js `16.0.3` (App Router, Server Actions)
- **Language:** TypeScript `^5`
- **UI:** Tailwind CSS `^4.1.17`, Shadcn/UI

Install tooling:
```bash
node --version  # 18.18+ recommended (Next.js requirement)
npm install
```

---

## Project Scripts
| Command       | Description                                    |
|---------------|------------------------------------------------|
| `npm run dev` | Start Next.js dev server at `http://localhost:3000` |
| `npm run build` | Create production build ( `.next/` )          |
| `npm run start` | Serve production build                        |
| `npm run lint` | Run ESLint with the Next.js config             |

---

## Running the Project Locally
1. **Install dependencies**
	```bash
	npm install
	```
2. **(Optional) Configure environment variables** – if your backend/API URLs differ from the defaults in `src/app/generate/actions.ts`, duplicate `.env.example` (if present) and update the values, or edit the action directly.
3. **Start the dev server**
	```bash
	npm run dev
	```
4. Open `http://localhost:3000` to start generating stories.

---

## Project Structure
```
├── public/
│   └── icons/                 # Static assets & SVGs
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout & fonts
│   │   ├── page.tsx           # Landing page
│   │   ├── about/             # Static marketing content
│   │   ├── generate/          # Multi-step story generator
│   │   │   ├── actions.ts     # Story/audio server actions
│   │   │   ├── child-info/    # Wizard steps (child info)
│   │   │   ├── custom-description/
│   │   │   ├── output-format/
│   │   │   ├── preview-story/ # Story preview + editor + audio
│   │   │   ├── select-values/
│   │   │   └── story-style/
│   │   ├── login/ & signup/   # Auth pages
│   │   └── api/               # Route handlers (auth, generate)
│   ├── components/
│   │   ├── audio/             # Audio player components
│   │   ├── layout/            # Navbar
│   │   ├── ui/                # Radix-based UI primitives
│   │   └── (wizard controls)  # Buttons, selectors, inputs
│   ├── lib/
│   │   ├── AuthContext.tsx
│   │   ├── StoryGenerationContext.tsx
│   │   ├── fonts.ts           # Local/remote font loading
│   │   └── utils.ts
│   └── styles, types, etc.
├── eslint.config.mjs
├── next.config.ts
├── tailwind/postcss configs
└── README.md
```

---

## Development Notes
- **Story data flow:** `StoryGenerationContext` centralizes wizard and preview data; server actions in `src/app/generate/actions.ts` call the Render backend for text/audio.
- **Styling:** Tailwind CSS v4 (framework mode) with design tokens declared in `src/app/globals.css`.
- **Audio:** `AudioPlayer` lazily requests audio via the `generateAudioAction`, converts the streamed MP3 to a data URL, and feeds the `<audio>` element.

For questions or contributions, feel free to open issues or PRs in this repository. Happy storytelling! 📚✨
