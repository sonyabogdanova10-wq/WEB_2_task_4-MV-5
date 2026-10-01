export class UIComponent {
  constructor(title, id) {
    this.title = title;
    this.id = id;
    this.element = null;
    // AbortController для отмены устаревших запросов при удалении виджета (требование 2026)
    this.abortController = new AbortController();
  }

  render() {
    const widget = document.createElement('div');
    widget.className = 'widget';
    widget.id = this.id;
    widget.setAttribute('tabindex', '0'); // Доступность с клавиатуры
    
    const header = document.createElement('div');
    header.className = 'widget-header';
    
    const titleEl = document.createElement('h3');
    titleEl.className = 'widget-title';
    titleEl.textContent = this.title; // Безопасно: защита от XSS
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'widget-close';
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', `Закрыть виджет ${this.title}`);
    // Слушатель привязан к сигналу отмены
    closeBtn.addEventListener('click', () => this.destroy(), { signal: this.abortController.signal });

    header.append(titleEl, closeBtn);
    widget.appendChild(header);
    
    this.element = widget;
    return widget;
  }

  destroy() {
    this.abortController.abort(); // Отменяем все активные fetch-запросы
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.element = null;
  }

  minimize() {
    if (this.element) {
      this.element.classList.toggle('minimized');
    }
  }
}
