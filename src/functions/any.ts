export function uniqueId(): number {
  const stored = Number(localStorage.getItem("uniqueId")) || 0;
  const next = stored + 1;
  localStorage.setItem("uniqueId", next.toString());
  return stored;
}

export function rotate(element: HTMLElement, deg: number): void {
  element.style.transition = 'transform 0.2s ease';

  const currentTransform = getComputedStyle(element).transform;

  let currentRotation = 0;
  if (currentTransform !== 'none') {
    const values = currentTransform.match(/matrix\(([^)]+)\)/);
    if (values) {
      const matrix = values[1].split(', ').map(parseFloat);
      const a = matrix[0];
      const b = matrix[1];
      currentRotation = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }
  }

  const newRotation = currentRotation === deg ? 0 : deg;
  element.style.transform = `rotate(${newRotation}deg)`;
}