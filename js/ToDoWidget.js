import { Dashboard } from './js/Dashboard.js';
import { ToDoWidget } from './js/ToDoWidget.js';
import { RandomPokemonWidget } from './js/RandomPokemonWidget.js';
import { PokemonSearchWidget } from './js/PokemonSearchWidget.js';

document.addEventListener('DOMContentLoaded', () => {
  const dashboard = new Dashboard('dashboard-container');
  let widgetCounter = 0;
  const generateId = (prefix) => `${prefix}-${++widgetCounter}`;

  document.getElementById('add-todo').addEventListener('click', () => {
    dashboard.addWidget(new ToDoWidget(generateId('todo')));
  });

  document.getElementById('add-random').addEventListener('click', () => {
    dashboard.addWidget(new RandomPokemonWidget(generateId('random')));
  });

  document.getElementById('add-search').addEventListener('click', () => {
    dashboard.addWidget(new PokemonSearchWidget(generateId('search')));
  });

  // Демонстрация при старте
  dashboard.addWidget(new RandomPokemonWidget(generateId('random')));
  dashboard.addWidget(new PokemonSearchWidget(generateId('search')));
});
