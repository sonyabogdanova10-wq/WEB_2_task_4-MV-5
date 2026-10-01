import { UIComponent } from './UIComponent.js';

export class RandomPokemonWidget extends UIComponent {
  constructor(id) {
    super('🎲 Случайный покемон', id);
  }

  async render() {
    const widgetEl = super.render();
    const content = document.createElement('div');
    content.className = 'widget-content';
    content.textContent = 'Нажмите кнопку для загрузки...'; // Состояние покоя
    widgetEl.appendChild(content);

    const btn = document.createElement('button');
    btn.textContent = 'Поймать случайного!';
    btn.className = 'btn widget-action-btn';

    const fetchRandom = async () => {
      content.textContent = 'Загрузка данных из PokéAPI...'; // Состояние загрузки
      content.classList.remove('error-state');
      
      const randomId = Math.floor(Math.random() * 1025) + 1; // 1-1025
      
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`, {
          signal: this.abortController.signal // Требование 2026: отменяемый запрос
        });
        
        if (!response.ok) throw new Error('Ошибка сети');
        const data = await response.json();

        content.textContent = ''; // Очистка перед успешным рендером

        // Безопасное создание элементов (защита от XSS, без innerHTML)
        const img = document.createElement('img');
        img.src = data.sprites.front_default || '';
        img.alt = `Изображение покемона ${data.name}`;
        img.className = 'pokemon-img';

        const name = document.createElement('h3');
        name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        const types = document.createElement('p');
        types.className = 'pokemon-types';
        types.textContent = 'Тип: ' + data.types.map(t => t.type.name).join(', ');

        const stats = document.createElement('p');
        stats.className = 'pokemon-stats';
        stats.textContent = `Рост: ${data.height / 10} м | Вес: ${data.weight / 10} кг`;

        content.append(img, name, types, stats); // Успешное состояние
      } catch (error) {
        if (error.name === 'AbortError') return; // Игнорируем отменённые запросы
        content.textContent = 'Ошибка загрузки. Проверьте интернет.'; // Состояние ошибки
        content.classList.add('error-state');
      }
    };

    btn.addEventListener('click', fetchRandom, { signal: this.abortController.signal });
    widgetEl.append(content, btn);
    
    // Загружаем одного при создании для демонстрации
    fetchRandom();
    
    return widgetEl;
  }
}
