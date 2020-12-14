/** Make windows draggable */

class WindowHandler {
  constructor() {
    this.mouse = {x: 0, y: 0};
    this.windows = [];

    // init windows
    document.querySelectorAll('.window').forEach(el => {
      const win = {el: el, mode: 'move'};
      this.windows.push(win);

      el.querySelector('.window__header').onmousedown = evt => {
        win.mode = 'move';
        const rect = el.getBoundingClientRect();
        win.x = rect.left + rect.width / 2;
        win.y = rect.top + rect.height / 2;
        this.mouse.x = evt.clientX;
        this.mouse.y = evt.clientY;
        win.active = true;
        win.el.classList.add('dragging');
      };

      el.querySelector('.window__resize').onmousedown = evt => {
        win.mode = 'resize';
        const rect = el.getBoundingClientRect();
        win.x = rect.left + rect.width / 2;
        win.y = rect.top + rect.height / 2;
        this.mouse.x = evt.clientX;
        this.mouse.y = evt.clientY;
        win.active = true;
        win.el.classList.add('dragging');
      };
    });

    // drag windows
    window.addEventListener('mousemove', evt => {
      this.windows.forEach(win => {
        if (win.active) {
          const dx = evt.clientX - this.mouse.x;
          const dy = evt.clientY - this.mouse.y;
          win.el.style.left = `${win.x + dx}px`;
          win.el.style.top = `${win.y + dy}px`;
        }
      });
    });

    // mouse up
    const onmouseup = evt => {
      this.windows.forEach(win => {
        win.active = false;
        win.el.classList.remove('dragging');
      });
    };
    window.addEventListener('mouseup', onmouseup);
    window.addEventListener('mouseleave', onmouseup);
  }
}

export default WindowHandler;
