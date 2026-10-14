import { createApp } from './ui/app.js';

const app = createApp({
  screenEl: document.getElementById('screen'),
  statusEl: document.getElementById('status'),
  flashEl: document.getElementById('flash'),
});

app.go('title');
