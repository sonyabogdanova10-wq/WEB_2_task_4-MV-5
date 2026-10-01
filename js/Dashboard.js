export class Dashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.widgets = new Map();
  }

  async addWidget(widgetInstance) {
    if (this.widgets.has(widgetInstance.id)) return;
    
    // Ждём, пока асинхронный render() вернёт готовый DOM-элемент
    const widgetEl = await widgetInstance.render();
    this.container.appendChild(widgetEl);
    this.widgets.set(widgetInstance.id, widgetInstance);
  }

  removeWidget(widgetId) {
    const widget = this.widgets.get(widgetId);
    if (widget) {
      widget.destroy();
      this.widgets.delete(widgetId);
    }
  }
}
