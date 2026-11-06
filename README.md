# fe-breed

A React and TypeScript practice app that puts several small features behind one router. I use it to try out state management and testing patterns, so it isn't a production product.

## Features

| Route | What it does |
|---|---|
| `/` | Browse pets from a public practice API |
| `/details/:id` | Pet details with an image carousel |
| `/movie` | Movie search using the OMDb API, with state in MobX |
| `/todo` | Todo list with state in MobX |
| `/interview-one` | Salary table exercise with filters and averages |

## Stack

React 18, TypeScript, MobX, React Router, Material UI, Vite, Vitest and React Testing Library.

## Run it locally

```bash
npm ci --ignore-scripts
```

`--ignore-scripts` skips the native build of the legacy `node-sass` dependency, which the app doesn't need to run or test.

The movie page needs a free [OMDb API key](https://www.omdbapi.com/apikey.aspx). Vite's root is `src`, so create `src/.env`:

```
VITE_REACT_APP_OMDB_API_KEY=your_key
```

| Command | What it does |
|---|---|
| `npm start` | Start the dev server |
| `npx vitest run` | Run the tests once |
| `npm run build` | Build to `src/dist` |

## Tests

Six tests in `src/__tests__` cover the carousel, the pet details page and the `useFetchSinglePet` hook, with network calls mocked.
