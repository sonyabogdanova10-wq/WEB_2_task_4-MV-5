import { UIComponent } from './UIComponent.js';

export class ToDoWidget extends UIComponent {
  constructor(id) {
    super('✅ Список дел', id);
  }

  render() {
    const widgetEl = super.render();

    const controls = document.createElement('div');
    controls.className = 'widget-controls';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Новая задача...';
    input.setAttribute('aria-label', 'Текст задачи');

    const btn = document.createElement('button');
    btn.textContent = 'Добавить';
    btn.className = 'btn';

    const list = document.createElement('ul');
    list.className = 'todo-list';

    const addItem = () => {
      const text = input.value.trim();
      if (!text) return;

      const li = document.createElement('li');
      li.className = 'todo-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
      }, { signal: this.abortController.signal });

      const span = document.createElement('span');
      span.textContent = text;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '×';
      deleteBtn.className = 'todo-delete';
      deleteBtn.addEventListener('click', () => {
        li.remove();
      }, { signal: this.abortController.signal });

      li.append(checkbox, span, deleteBtn);
      list.appendChild(li);
      input.value = '';
    };

    btn.addEventListener('click', addItem, { signal: this.abortController.signal });
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addItem();
    }, { signal: this.abortController.signal });

    controls.append(input, btn);
    widgetEl.append(controls, list);

    return widgetEl;
  }
}