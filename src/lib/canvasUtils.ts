// src/lib/canvasUtils.ts (Создайте этот файл)

/**
 * Создает путь в форме squircle на 2D контексте Canvas.
 * Адаптировано из логики библиотеки squircle-js.
 * @param ctx - 2D контекст Canvas.
 * @param width - Ширина фигуры.
 * @param height - Высота фигуры.
 * @param cornerRadius - Радиус скругления углов.
 * @param cornerSmoothing - Коэффициент сглаживания углов (от 0 до 1).
 */
export function createSquirclePath(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cornerRadius: number,
  cornerSmoothing: number,
): void {
  // Ограничиваем радиус максимальным возможным значением
  let radius = Math.min(cornerRadius, width / 2, height / 2);
  if (radius < 0) radius = 0;

  const smoothing = Math.max(0, Math.min(1, cornerSmoothing)); // Убедимся, что сглаживание в диапазоне [0, 1]

  // Расстояние до контрольных точек Безье от угла
  const controlPointDist = radius * (1 - smoothing);

  ctx.beginPath();

  // Верхний левый угол
  ctx.moveTo(0, radius);
  ctx.bezierCurveTo(0, controlPointDist, controlPointDist, 0, radius, 0);

  // Верхняя грань
  ctx.lineTo(width - radius, 0);

  // Верхний правый угол
  ctx.bezierCurveTo(
    width - controlPointDist,
    0,
    width,
    controlPointDist,
    width,
    radius,
  );

  // Правая грань
  ctx.lineTo(width, height - radius);

  // Нижний правый угол
  ctx.bezierCurveTo(
    width,
    height - controlPointDist,
    width - controlPointDist,
    height,
    width - radius,
    height,
  );

  // Нижняя грань
  ctx.lineTo(radius, height);

  // Нижний левый угол
  ctx.bezierCurveTo(
    controlPointDist,
    height,
    0,
    height - controlPointDist,
    0,
    height - radius,
  );

  // Левая грань и закрытие пути
  ctx.closePath(); // Соединяет с начальной точкой ctx.moveTo(0, radius)
}

/**
 * Рисует изображение на canvas с применением маски squircle.
 * @param canvas - Элемент Canvas для рисования.
 * @param imageSrc - Источник изображения (Data URL).
 * @param cornerRadius - Радиус скругления.
 * @param cornerSmoothing - Сглаживание углов.
 * @param displayWidth - Желаемая ширина отображения на canvas.
 * @param displayHeight - Желаемая высота отображения на canvas.
 */
export async function drawSquircleImageOnCanvas(
  canvas: HTMLCanvasElement | null,
  imageSrc: string,
  cornerRadius: number,
  cornerSmoothing: number,
  /** Upper bound for either side of the bitmap (defaults to 4096px). */
  maxSize = 4096,
): Promise<void> {
  if (!canvas) return;

  const img = new Image();
  img.src = imageSrc;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  // 1️⃣  Define final bitmap dimensions — keep aspect ratio, cap by maxSize for memory‑safety.
  const scale = Math.min(
    1,
    maxSize / Math.max(img.naturalWidth, img.naturalHeight),
  );
  const bmpW = Math.round(img.naturalWidth * scale);
  const bmpH = Math.round(img.naturalHeight * scale);

  // 2️⃣  Resize canvas *physical* pixels for DPR; set CSS size for page layout.
  const dpr = window.devicePixelRatio || 1;
  canvas.width = bmpW * dpr;
  canvas.height = bmpH * dpr;
  canvas.style.width = `${bmpW}px`;
  canvas.style.height = `${bmpH}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.save();
  ctx.scale(dpr, dpr); // map user‑space to CSS pixels

  // 3️⃣  Build squircle clipping path that exactly matches *current* rectangle.
  createSquirclePath(ctx, bmpW, bmpH, cornerRadius, cornerSmoothing);
  ctx.clip();

  // 4️⃣  Draw the full‑size image — no squeezing / letter‑boxing.
  ctx.drawImage(img, 0, 0, bmpW, bmpH);
  ctx.restore();
}
