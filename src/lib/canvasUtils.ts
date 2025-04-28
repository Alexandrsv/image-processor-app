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
  displayWidth: number = 300, // Размер canvas по умолчанию
  displayHeight: number = 300,
): Promise<void> {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Устанавливаем реальный размер canvas (важно для четкости)
  canvas.width = displayWidth * window.devicePixelRatio;
  canvas.height = displayHeight * window.devicePixelRatio;
  canvas.style.width = `${displayWidth}px`;
  canvas.style.height = `${displayHeight}px`;

  // Масштабируем контекст для учета devicePixelRatio
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  // Очищаем canvas перед рисованием
  ctx.clearRect(0, 0, displayWidth, displayHeight);

  // Загружаем изображение для получения его размеров
  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = imageSrc;
  });

  // Создаем путь squircle
  createSquirclePath(
    ctx,
    displayWidth,
    displayHeight,
    cornerRadius,
    cornerSmoothing,
  );

  // Устанавливаем этот путь как маску (clipping region)
  ctx.save(); // Сохраняем текущее состояние контекста
  ctx.clip();

  // Рассчитываем размеры для рисования изображения с сохранением пропорций (object-contain)
  const imgAspectRatio = img.naturalWidth / img.naturalHeight;
  const canvasAspectRatio = displayWidth / displayHeight;
  let drawWidth = displayWidth;
  let drawHeight = displayHeight;
  let dx = 0;
  let dy = 0;

  if (imgAspectRatio > canvasAspectRatio) {
    // Изображение шире canvas
    drawHeight = displayWidth / imgAspectRatio;
    dy = (displayHeight - drawHeight) / 2; // Центрируем по вертикали
  } else {
    // Изображение выше canvas или такое же по пропорциям
    drawWidth = displayHeight * imgAspectRatio;
    dx = (displayWidth - drawWidth) / 2; // Центрируем по горизонтали
  }

  // Рисуем изображение внутри маски
  ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

  ctx.restore(); // Восстанавливаем контекст (убираем маску для будущих операций, если они будут)
}
