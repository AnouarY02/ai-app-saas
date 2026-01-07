export const routes = [
  { path: '/', layout: 'main', authRequired: false },
  { path: '/login', layout: 'auth', authRequired: false },
  { path: '/register', layout: 'auth', authRequired: false },
  { path: '/app', layout: 'main', authRequired: true },
  { path: '/settings', layout: 'main', authRequired: true },
  { path: '/logout', layout: 'auth', authRequired: false },
  { path: '/error', layout: 'plain', authRequired: false }
];
