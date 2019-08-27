# Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)

  - [npm run dev](#npm-run-dev)
  - [npm run build](#npm-run-build)
  - [npm run start](#npm-run-start)

# Folder Structure

```
.
├── README.md
├── pages
│   └── index.js
|   └── episode
|       └── [id].js
├── src
│   ├── components
│   └── features
|       └── Player
|           └── components
|           └── index.js
├── node_modules
│   ├── [...]
├── package.json
├── static
│   └── favicon.ico
└── yarn.lock
```

Routing in Next.js is based on the file system, so `./pages/index.js` maps to the `/` route and `./pages/about.js` would map to `/about`.

The `./static` directory maps to `/static` in the `next` server, so you can put all your other static resources like images or compiled CSS in there.

Out of the box, we get:

- Automatic compilation and bundling (with Babel and webpack)
- Hot code reloading
- Server rendering and indexing of `./pages/`
- Static file serving. `./static/` is mapped to `/static/`

Read more about [Next's Routing](https://github.com/zeit/next.js#routing)

# Available Scripts

In the project directory, you can run:

## `npm run dev`

Runs the app in the development mode.<br>
Open <http://localhost:3000> to view it in the browser.

The page will reload if you make edits.<br>
You will also see any errors in the console.

## `npm run build`

Builds the app for production to the `.next` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## `npm run start`

Starts the application in production mode. The application should be compiled with `next build` first.

See the section in Next docs about [deployment](https://github.com/zeit/next.js/wiki/Deployment) for more information.
