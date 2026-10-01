import { UIComponent } from './UIComponent.js';

export class PokemonSearchWidget extends UIComponent {
  constructor(id) {
    super('🔍 Поиск покемона', id);
  }

  async render() {
    const widgetEl = super.render();
    
    const controls = document.createElement('div');
    controls.className = 'widget-controls';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Например: pikachu';
    input.setAttribute('aria-label', 'Имя покемона для поиска');
    
    const btn = document.createElement('button');
    btn.textContent = 'Найти';
    btn.className = 'btn';

    const content = document.createElement('div');
    content.className = 'widget-content';
    content.textContent = 'Введите имя и нажмите "Найти"';

    const fetchPokemon = async () => {
      const query = input.value.trim().toLowerCase();
      if (!query) return;

      content.textContent = 'Поиск...';
      content.classList.remove('error-state');

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`, {
          signal: this.abortController.signal
        });
        
        if (!response.ok) {
          if (response.status === 404) throw new Error('Покемон не найден');
          throw new Error('Ошибка сети');
        }
        
        const data = await response.json();
        content.textContent = '';

        const img = document.createElement('img');
        img.src = data.sprites.front_default || '';
        img.alt = `Изображение ${data.name}`;
        img.className = 'pokemon-img';

        const name = document.createElement('h3');
        name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        const abilities = document.createElement('p');
        abilities.textContent = 'Способности: ' + data.abilities.map(a => a.ability.name).join(', ');

        content.append(img, name, abilities);
      } catch (error) {
        if (error.name === 'AbortError') return;
        content.textContent = error.message === 'Покемон не найден' 
          ? 'Покемон не найден. Проверьте название (на англ. языке).' 
          : 'Ошибка сети.';
        content.classList.add('error-state');
      }
    };

    btn.addEventListener('click', fetchPokemon, { signal: this.abortController.signal });
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') fetchPokemon();
    }, { signal: this.abortController.signal });

    controls.append(input, btn);
    widgetEl.append(controls, content);
    
    return widgetEl;
  }
}
