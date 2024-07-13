# Remote Tetris

The Tetris game with remote controller support.

## Description

The application's purpose is to brush up my skills in the Svelte framework (Single Page App version), WebSocket, and WebRTC communication protocols (using native browser's objects).

## Demo

⚠️ Use Google Chrome, other browsers were not tested so might not work ☠️

A demo is available at [https://remote-tetris.vercel.app](https://remote-tetris.vercel.app).

## Screenshots

### Landing page

![landing-page](./screenshots/landing-page.webp)

### Game play

![game-play](./screenshots/gameplay.webp)

### Game over

![game-over](./screenshots/game-over.webp)

### Remote controller

![remote-controller](./screenshots/remote-controller.webp)

## Used technologies

- 🎁 Repository: regular Git repository,
- 🧰 Frameworks: Svelte and Vite build system,
- 🛠️ Tools: canvas, svelte qr code, native WebSocket, native WebRTC, express.js,
- 🎨 Styling: standard CSS,
- 💎 Others: desktop-first approach.

## Encountered problems and its solutions

### Image `<map>` is not responsive

The HTML `<map>` tag defines an image map, but the defined map's elements are based on pixels, so they do not support scaling up and down with a responsive image. In the result, if the image is scaled using the `object-fit: contain;` to fit the whole width of the view, the defined image map's objects do not correspond to the image's objects.

The solution is to define an SVG transparent image, define the elements above the image's elements, and then place the SVG on top of the image using the `position: absolute` declaration. SVG objects even if they are expressed in the pixels, the browser can scale up keeping the correct ratio between SVG objects and the total width of the image.

### WebRTC's Offer, Answer, and Ice Candidates have to be exchanged manually

The WebRTC provides interfaces and methods to establish the peer-to-peer connection but does not provide any solution to exchange the initial data (offer, answer, and ice candidates) between the peers.

The solution is to define a simple express.js server. The game landing page generates the offer and sends it to the server via Web Socket. When the user scans the QR code and navigates to the controller's view, its logic generates a GET request to fetch the offer object, accepts it, and generates the answer sent as a POST request's payload to the server. Finally, the game landing page is notified by the server via Web Socket that the answer is ready.


## How to start

1. Clone the repository.
2. Install node.js and pnpm.
3. Install dependencies with `pnpm install`.
4. Run the server with `pnpm run dev:server`.
5. Run the project with `pnpm run dev`.
