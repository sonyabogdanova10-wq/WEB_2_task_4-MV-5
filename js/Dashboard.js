export class Dashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.widgets = new Map(); // Хранилище виджетов: id -> экземпляр
  }

  addWidget(widgetInstance) {
    if (this.widgets.has(widgetInstance.id)) return;
    
    const widgetEl = widgetInstance.render();
    this.container.appendChild(widgetEl);
    this.widgets.set(widgetInstance.id, widgetInstance);
  }

  removeWidget(widgetId) {
    const widget = this.widgets.get(widgetId);
    if (widget) {
      widget.destroy(); // Корректная очистка внутри виджета
      this.widgets.delete(widgetId);
    }
  }
}
