# Jack Hancock Portfolio

My personal developer portfolio, built to showcase the projects, skills and technologies I'm learning while working toward a career in DevSecOps.

The site is built with React and includes an interactive Three.js hero with responsive 3D text, a custom cyan-to-pink gradient, pointer interaction, delayed idle rotation, a procedural star field and a few hidden easter eggs.

**Live site:** https://jackhancock.dev

---

## Overview

This project originally started as a static HTML and CSS portfolio.

As I became more comfortable with JavaScript and component-based development, I migrated the site to React and rebuilt the hero using Three.js and React Three Fiber.

The current hero renders my name as real 3D geometry, responds to pointer movement and automatically begins rotating after a period of inactivity.

The rest of the site is deliberately kept simple so the focus stays on my projects, background and learning journey.

---

## Features

- Interactive 3D hero
- Responsive 3D text
- Cyan-to-pink vertex colour gradient
- Pointer-controlled pitch and yaw
- Smooth frame-rate-independent animation
- Delayed idle rotation
- Procedural star field
- Subtle bloom and tone mapping
- Responsive portfolio layout
- Hidden easter eggs
- About, Projects, Journey and Contact sections

---

## Tech Stack

### Frontend

- React
- JavaScript
- CSS
- Vite

### 3D

- Three.js
- React Three Fiber
- Drei
- React Postprocessing
- WebGL

---

## 3D Hero

The hero is rendered directly in the browser using Three.js rather than using a pre-rendered image or video.

The text is generated with Drei's `Text3D` component and remains fully interactive.

### Responsive Scaling

The text uses the React Three Fiber viewport to scale itself when the browser becomes narrower.

```js
const textScale = Math.min(
  1,
  viewport.width / TEXT_BASE_WIDTH
)
```

This keeps the hero centred and usable across ultrawide and smaller displays.

### Vertex Colour Gradient

The cyan-to-pink gradient is applied directly to the text geometry.

```js
const GRADIENT_START = '#03cefc'
const GRADIENT_END = '#fc00c5'
```

Each vertex receives a colour based on its horizontal position across the text.

This keeps the gradient attached to the geometry as the text rotates.

### Pointer Interaction

Pointer movement controls the text rotation:

```text
pointer X -> yaw
pointer Y -> pitch
```

`THREE.MathUtils.damp()` is used to smoothly move toward the target rotation rather than snapping instantly.

### Idle Rotation

After approximately 5.5 seconds without pointer movement, the hero begins rotating automatically.

When pointer movement resumes, the accumulated rotation is normalised so the text returns to interactive control using the shortest rotational path instead of rewinding through previous rotations.

---

## Star Field

The background stars are generated procedurally using a single Three.js points geometry.

Each star stores an X, Y and Z coordinate inside a `Float32Array`.

The positions are generated once with `useMemo()` rather than being recreated every render.

---

## Easter Eggs

A few small easter eggs are hidden in the hero.

- Rapidly clicking the 3D name five times triggers a short glitch effect
- Typing `sudo` reveals a terminal-style response
- Opening the browser developer console reveals a hidden message

None of the easter eggs are required to navigate or use the portfolio.

---

## Project Structure

```text
Jack-Hancock-Portfolio/
├── public/
│   ├── fonts/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── Scene.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

`App.jsx` contains the main portfolio content and page structure.

`Scene.jsx` contains the Three.js hero, including the 3D text, gradient, pointer interaction, idle rotation, star field and easter eggs.

---

## Running Locally

### Requirements

- Node.js
- npm

Clone the repository:

```bash
git clone https://github.com/jackd3v/Jack-Hancock-Portfolio.git
```

Enter the project:

```bash
cd Jack-Hancock-Portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Production Build

Create a production build with:

```bash
npm run build
```

The compiled application will be generated inside:

```text
dist/
```

---

## What I Learned

This project started as a simple static portfolio and became somewhere I could apply new development concepts as I learned them.

Some of the main things I learned include:

- Migrating a static HTML/CSS site into React
- Working with React Three Fiber and Three.js
- Understanding 3D cameras and world-space coordinates
- Creating interactive 3D text
- Working with Three.js buffer geometry and vertex colours
- Using refs for continuously changing animation state
- Building frame-rate-independent animation with `useFrame()` and delta time
- Working with pitch, yaw and rotation
- Creating responsive behaviour inside a 3D scene
- Detecting pointer inactivity
- Handling continuous rotation and angle wrapping
- Procedurally generating geometry data
- Debugging pointer events caused by HTML elements above a WebGL canvas
- Keeping different behaviours separated into clear responsibilities

The original hero was going to use a complete 3D computer-room scene created in Blender.

I eventually got that version working in the browser, but it became more complicated than the portfolio needed and started taking attention away from the actual content.

I removed it and rebuilt the hero around a much simpler interactive 3D name.

That ended up being one of the most useful lessons from the project: getting a complicated solution working does not automatically make it the right solution.

---

## Future Development

The portfolio itself is now intended to remain relatively stable.

Future updates will mainly focus on:

- adding new projects
- expanding project write-ups
- accessibility improvements
- performance optimisation
- improving the deployment workflow

The main goal now is to spend more time building development, security, automation, container and cloud projects for the portfolio to showcase.

---

## Author

**Jack Hancock**

GitHub: [@jackd3v](https://github.com/jackd3v)

Portfolio: [jackhancock.dev](https://jackhancock.dev)