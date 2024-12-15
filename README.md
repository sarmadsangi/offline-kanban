# Offline Kanban

A browser-based Kanban board that works offline, powered by modern web technologies.

[![Build Status](https://travis-ci.org/sarmadsangi/offline-kanban.svg?branch=master)](https://travis-ci.org/sarmadsangi/offline-kanban)

## Getting Started

```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
```

## Deployment

### GitHub Pages Deployment

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"
4. Push your code to the master/main branch

The site will be automatically built and deployed to [https://sarmadsangi.github.io/offline-kanban](https://sarmadsangi.github.io/offline-kanban)

Note: Make sure your repository is public and GitHub Pages is enabled in your repository settings.

## Architecture

- **Frontend**: React.js with CSS Modules for component-scoped styling
- **State Management**: MobX for predictable state updates
- **Offline Storage**: PouchDB (IndexedDB/WebSQL) for persistent local storage
- **Offline Capability**: Service Workers and AppCache for offline asset serving
- **Continuous Integration**: Travis CI with automated Heroku deployment

### Key Features

- Fully functional offline-first architecture
- Real-time state persistence
- Drag-and-drop card management
- Automatic state synchronization
- Component-isolated styling

## Roadmap

1. Mobile-responsive design optimization
2. Store architecture refactoring
3. Drag-and-drop operation improvements
4. Performance optimizations
5. Enhanced sorting algorithm implementation

## Development Status

[![Build Status](https://travis-ci.org/sarmadsangi/offline-kanban.svg?branch=master)](https://travis-ci.org/sarmadsangi/offline-kanban)

