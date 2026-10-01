import { Dashboard } from './Dashboard.js';
import { ToDoWidget } from './ToDoWidget.js';
import { RandomPokemonWidget } from './RandomPokemonWidget.js';
import { PokemonSearchWidget } from './PokemonSearchWidget.js';

document.addEventListener('DOMContentLoaded', () => {
  const dashboard = new Dashboard('dashboard-container');
  let widgetCounter = 0;
  const generateId = (prefix) => `${prefix}-${++widgetCounter}`;

  document.getElementById('add-todo').addEventListener('click', async () => {
    await dashboard.addWidget(new ToDoWidget(generateId('todo')));
  });

  document.getElementById('add-random').addEventListener('click', async () => {
    await dashboard.addWidget(new RandomPokemonWidget(generateId('random')));
  });

  document.getElementById('add-search').addEventListener('click', async () => {
    await dashboard.addWidget(new PokemonSearchWidget(generateId('search')));
  });

  // Демонстрация при старте
  (async () => {
    await dashboard.addWidget(new RandomPokemonWidget(generateId('random')));
    await dashboard.addWidget(new PokemonSearchWidget(generateId('search')));
  })();
});
