// src/modules/squircle/SquircleView.tsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SquircleControls } from "./components/SquircleControls";
import { toast } from "sonner";
import { drawSquircleImageOnCanvas } from "@/lib/canvasUtils"; // <--- Импортируем нашу утилиту
import { Download, Trash2 } from "lucide-react"; // Иконки для кнопок

interface ImageState {
  id: string;
  src: string; // Data URL
  name: string;
}

export function SquircleView() {
  const [images, setImages] = useState<ImageState[]>([]);
  const [cornerRadius, setCornerRadius] = useState<number>(50);
  const [smoothing, setSmoothing] = useState<number>(0.7);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Используем Map для хранения ссылок на canvas, ключ - id изображения
  const canvasRefs = useRef<Map<string, HTMLCanvasElement | null>>(new Map());

  // --- Функции handleFileChange, triggerFileInput, removeImage ---
  // (Остаются такими же, как в вашем коде, но убраны originalWidth/Height из state)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newImages: Omit<ImageState, "id">[] = []; // Временное хранилище без ID
    const promises = Array.from(files).map((file) => {
      return new Promise<void>((resolve, reject) => {
        if (!file.type.startsWith("image/")) {
          toast.error("Ошибка загрузки", {
            description: `Файл "${file.name}" не является изображением.`,
          });
          reject(new Error("Not an image"));
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          // Проверяем результат чтения
          if (typeof e.target?.result === "string") {
            newImages.push({
              src: e.target.result,
              name: file.name,
            });
            resolve();
          } else {
            toast.error("Ошибка", {
              description: `Не удалось прочитать файл "${file.name}".`,
            });
            reject(new Error("File read error"));
          }
        };
        reader.onerror = () => {
          toast.error("Ошибка", {
            description: `Не удалось прочитать файл "${file.name}".`,
          });
          reject(new Error("File read error"));
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.allSettled(promises).then((results) => {
      // Фильтруем успешно прочитанные и добавляем ID
      const successfullyLoaded = newImages
        .filter((_, index) => results[index].status === "fulfilled")
        .map((imgData) => ({ ...imgData, id: crypto.randomUUID() })); // Добавляем ID здесь

      if (successfullyLoaded.length > 0) {
        setImages((prevImages) => [...prevImages, ...successfullyLoaded]);
        toast.success(`Загружено изображений: ${successfullyLoaded.length}`);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    // Удаляем ref при удалении изображения
    canvasRefs.current.delete(id);
  };
  // --- Конец неизмененных функций ---

  // Функция для перерисовки всех canvas при изменении параметров
  const redrawAllCanvases = useCallback(() => {
    images.forEach((img) => {
      const canvas = canvasRefs.current.get(img.id);
      if (canvas) {
        drawSquircleImageOnCanvas(
          canvas,
          img.src,
          cornerRadius,
          smoothing,
        ).catch((err) => {
          console.error("Failed to redraw canvas:", err);
          toast.error("Ошибка", {
            description: `Не удалось обновить "${img.name}".`,
          });
        });
      }
    });
  }, [images, cornerRadius, smoothing]); // Зависимости useEffect

  // Перерисовываем при изменении параметров
  useEffect(() => {
    redrawAllCanvases();
  }, [cornerRadius, smoothing, redrawAllCanvases]); // Добавили redrawAllCanvases

  // Функция для сохранения изображения с canvas
  const handleSaveImage = (id: string) => {
    const canvas = canvasRefs.current.get(id);
    const image = images.find((img) => img.id === id);

    if (canvas && image) {
      try {
        // Получаем Data URL в формате PNG (поддерживает прозрачность)
        const dataUrl = canvas.toDataURL("image/png");

        // Создаем временную ссылку для скачивания
        const link = document.createElement("a");
        link.href = dataUrl;
        // Формируем имя файла
        const baseName =
          image.name.substring(0, image.name.lastIndexOf(".")) || image.name;
        link.download = `${baseName}-squircle.png`; // Добавляем суффикс

        // Имитируем клик для скачивания
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success(`Изображение "${link.download}" сохранено.`);
      } catch (error) {
        console.error("Failed to save canvas:", error);
        toast.error("Ошибка сохранения", {
          description: "Не удалось сохранить изображение.",
        });
      }
    } else {
      toast.error("Ошибка сохранения", {
        description: "Не удалось найти canvas или данные изображения.",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Скругление Углов (Canvas)</h1>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        style={{ display: "none" }}
      />

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start">
        <Button onClick={triggerFileInput}>Загрузить изображения</Button>
        <div className="flex-grow">
          <SquircleControls
            cornerRadius={cornerRadius}
            setCornerRadius={setCornerRadius}
            smoothing={smoothing}
            setSmoothing={setSmoothing}
          />
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex flex-wrap gap-6">
        {/* Увеличил gap */}
        {images.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center">
            Загрузите одно или несколько изображений для начала работы.
          </p>
        )}
        {images.map((img) => (
          <div
            key={img.id}
            className="border  rounded-lg shadow-sm flex flex-col items-center p-2 relative group" // Добавил group для кнопок
          >
            {/* Элемент Canvas для рисования */}
            <canvas
              ref={(el) => {
                if (el) {
                  canvasRefs.current.set(img.id, el);
                } else {
                  canvasRefs.current.delete(img.id);
                }
              }}
              // УБИРАЕМ max-w-full и h-auto. Оставляем только block и mb-2 (или убираем и его)
              className="block mb-2" // <--- ИЗМЕНЕНИЕ ЗДЕСЬ
              data-img-src={img.src}
            />
            {/* Эффект для начальной отрисовки */}
            <InitialCanvasDraw
              canvasRef={canvasRefs.current.get(img.id)}
              imageSrc={img.src}
              cornerRadius={cornerRadius}
              smoothing={smoothing}
              imageName={img.name}
            />

            <p className="text-xs text-center p-1 truncate text-muted-foreground w-full">
              {img.name}
            </p>

            {/* Кнопки управления */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => handleSaveImage(img.id)}
                title="Сохранить"
              >
                <Download className="h-5 w-5" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeImage(img.id)}
                title="Удалить"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Небольшой доп. компонент для вызова отрисовки при монтировании canvas
interface InitialCanvasDrawProps {
  canvasRef: HTMLCanvasElement | null | undefined;
  imageSrc: string;
  cornerRadius: number;
  smoothing: number;
  imageName: string;
}
function InitialCanvasDraw({
  canvasRef,
  imageSrc,
  cornerRadius,
  smoothing,
  imageName,
}: InitialCanvasDrawProps) {
  useEffect(() => {
    if (canvasRef) {
      console.log(`Initial draw for: ${imageName}`);
      drawSquircleImageOnCanvas(
        canvasRef,
        imageSrc,
        cornerRadius,
        smoothing,
      ).catch((err) => {
        console.error("Initial draw failed:", err);
        toast.error("Ошибка отрисовки", {
          description: `Не удалось отрисовать "${imageName}".`,
        });
      });
    }
    // Зависимости: ссылка на canvas и источник изображения (параметры возьмутся из redrawAllCanvases)
    // Перерисовка при изменении параметров управляется из основного useEffect
  }, [canvasRef, imageSrc, cornerRadius, smoothing, imageName]); // Добавил зависимости

  return null; // Этот компонент ничего не рендерит
}
