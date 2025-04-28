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
) {
  // 💡  Convert *ratio* radii to pixels.
  const minSide = Math.min(width, height);
  let radiusPx = cornerRadius <= 1 ? cornerRadius * minSide : cornerRadius;

  // Clamp so it never exceeds half the respective sides.
  radiusPx = Math.min(radiusPx, width / 2, height / 2);
  if (radiusPx < 0) radiusPx = 0;

  const smoothing = Math.max(0, Math.min(1, cornerSmoothing));
  const cp = radiusPx * (1 - smoothing); // ctrl‑point distance

  ctx.beginPath();
  ctx.moveTo(radiusPx, 0);
  // Top edge → Top‑right corner
  ctx.lineTo(width - radiusPx, 0);
  ctx.bezierCurveTo(width - cp, 0, width, cp, width, radiusPx);
  // Right edge → Bottom‑right
  ctx.lineTo(width, height - radiusPx);
  ctx.bezierCurveTo(
    width,
    height - cp,
    width - cp,
    height,
    width - radiusPx,
    height,
  );
  // Bottom edge → Bottom‑left
  ctx.lineTo(radiusPx, height);
  ctx.bezierCurveTo(cp, height, 0, height - cp, 0, height - radiusPx);
  // Left edge → Top‑left + close
  ctx.lineTo(0, radiusPx);
  ctx.bezierCurveTo(0, cp, cp, 0, radiusPx, 0);
  ctx.closePath();
}
/**
 * Draw `imageSrc` into `canvas` masked by a squircle.
 * `cornerRadius` follows the *same* pixel/ratio semantics described above.
 */
export async function drawSquircleImageOnCanvas(
  canvas: HTMLCanvasElement | null,
  imageSrc: string,
  cornerRadius: number,
  cornerSmoothing: number,
  maxSize = 4096,
): Promise<void> {
  if (!canvas) return;

  const img = new Image();
  img.src = imageSrc;

  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error("Image load failure"));
  });

  // ↳ Maintain aspect‑ratio, cap side length.
  const scale = Math.min(
    1,
    maxSize / Math.max(img.naturalWidth, img.naturalHeight),
  );
  const bmpW = Math.round(img.naturalWidth * scale);
  const bmpH = Math.round(img.naturalHeight * scale);

  const dpr = window.devicePixelRatio || 1;
  canvas.width = bmpW * dpr;
  canvas.height = bmpH * dpr;
  canvas.style.width = `${bmpW}px`;
  canvas.style.height = `${bmpH}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.save();
  ctx.scale(dpr, dpr);
  createSquirclePath(ctx, bmpW, bmpH, cornerRadius, cornerSmoothing);
  ctx.clip();
  ctx.drawImage(img, 0, 0, bmpW, bmpH);
  ctx.restore();
}
