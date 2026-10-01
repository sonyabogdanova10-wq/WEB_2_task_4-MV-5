export class Dashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.widgets = new Map();
  }

  async addWidget(widgetInstance) {  // ← Добавили async
    if (this.widgets.has(widgetInstance.id)) return;
    
    const widgetEl = await widgetInstance.render();  // ← Добавили await
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