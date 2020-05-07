let canvas: HTMLElement | undefined;

export function setCanvasEl(canvas_: HTMLElement) {
  canvas = canvas_;
}

export function getNextEl(id: string): HTMLElement | null {
  return canvas
    ? (canvas.querySelector(`#rx-component-${id}`) as HTMLElement)
    : null;
}
