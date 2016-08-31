
# Offline Kanban

_Kanban board that just works in your browser (even when you have no internet)_

[![Build Status](https://travis-ci.org/sarmadsangi/offline-kanban.svg?branch=master)](https://travis-ci.org/sarmadsangi/offline-kanban)

### Getting started
```javascript
npm install
npm run dev
```

### Production build
```javascript
npm run build
```

### Architecture (TODO)

I will be adding a dragram/details to explain architecture properly. Here is the few bullet points of architecture/tech stack,

1. View (ReactJS) responds to state changes (Mobx: state management)
2. Most of Kanban board logic (add cards, remove cards, add list, move cards to lists and etc) is in `stores/kanban.js`
3. Everytime state changes (in `KanbanStore`) it auto saves a snapshot of `KanbanBoard` state to `PouchDB (IndexedDB/WebSQL)`
4. All assets are cached in browser using `app cache`, `service workers` look for any new changes and auto updates the cache.
5. Since `PouchDB` in this case is just storing everything locally the whole thing is available offline.
6. `CSS Modules` to avoid global conflicts and to decipline myself in writing css per component only.
7. `Travis` is used for CI and app is deployed to heroku automatically after CI passes. Check [![Build Status](https://travis-ci.org/sarmadsangi/offline-kanban.svg?branch=master)](https://travis-ci.org/sarmadsangi/offline-kanban)
