## **Image Processor App**
🇷🇺 Russian README: [README.md](README.md)  
🇬🇧 English README: [README_EN.md](README_EN.md)  

`Image Processor App` — это браузерная песочница на **Vite + React + Tailwind**, позволяющая тестировать и демонстрировать идеи по обработке изображений **без установки программ и серверов**. Форкните репозиторий, задеплойте на GitHub Pages и делитесь одной ссылкой, где пользователи смогут перетащить файл, настроить параметры и скачать результат.  



| Возможность               | Что даёт                                                     |
|---------------------------|--------------------------------------------------------------|
| **Браузерный**            | Приложение работает без бэка                                 |
| **Реестр модулей**        | Каждый эффект — отдельная папка, авто-регистрация и роутинг. |
| **Тёмная / светлая тема** | Переключатель `next-themes` + `dark:`-утилиты Tailwind.      |

🔗 **Демо:** <https://alexandrsv.github.io/image-processor-app/>

---

### ✨ Модель **Squircle** (маска «плавный прямоугольник») онлайн бесплатно

Нужны аватары, стикеры или UI-превью с мягкими скруглёнными углами в стиле iOS? Откройте Squircle-песочницу:

<https://alexandrsv.github.io/image-processor-app/squircle>

#### Что такое squircle?
**Squircle** («square + circle») — это форма, где прямые стороны плавно переходят в кривые с помощью Bézier-кривой, без резкого скачка `border-radius`. Популяризирована иконками iOS; выглядит мягче и **уменьшает алиасинг** на маленьких размерах.

#### Почему стоит использовать?
* **Смотрится лучше, чем жёсткий `border-radius`** — нет «плоской» кромки перед углом.
* **Без рваных пикселей** — Bézier-сглаживание даёт идеальные углы на retina-экранах.
* **Без лишней разметки** — всё в canvas-маске; никакого вложенного `<div>` или SVG-клипов.
* **Любой формат и разрешение** — фотографии, PNG с альфой, UI-мокапы.
* **Мгновенное скачивание** — один клик и PNG с прозрачностью у вас.

#### Ключевые возможности
* **Сохраняет исходное разрешение и пропорции** — 4 K останется 4 K.
* **Радиус в px или %** (`0.25` = 25 % короткой стороны).
* **Настраиваемая плавность** — от острого до супер-круглого.
* **Экспорт PNG с альфой** — готово для аватаров, стикеров, маркетинга и др.

<details>
<summary>Структура модуля</summary>

```
src/modules/squircle/
├── SquircleView.tsx   # UI: загрузка → радиус/плавность → PNG
├── config.ts          # Метаданные для авто-регистрации
└── (math)             # Bézier-утилы в src/lib/canvasUtils.ts
```
</details>

---

### 🚀 Быстрый старт

<details>
<summary>Осторожно</summary>

```
При написании был использован vibe coding
```
</details>

```bash
git clone https://github.com/<you>/image-processor-app.git
cd image-processor-app

bun install      # или npm ci / bun i
bun run dev      # → http://localhost:5173
```

Сборка и локальный предпросмотр:

```bash
bun run build
bun run preview
```

Пуш в **master** → GitHub Pages деплоит автоматически (`.github/workflows/deploy.yml`).

---

### 📦 Cтруктура репозитория

```
.
├── src/
│   ├── modules/           # <— Ваши модули обработки изображений
│   │   └── squircle/      # Пример маски «плавный прямоугольник»
│   ├── components/        # Общие UI-компоненты
│   ├── lib/               # Canvas-утилиты
│   └── App.tsx            # Роутер + ThemeProvider
├── public/                # Статика
├── tailwind.config.ts     # Tailwind «darkMode: class»
├── vite.config.ts         # BASE_PATH для GitHub Pages
└── ...
```

---

### ➕ Cоздание собственного модуля

1. Создайте `src/modules/<id>/` с `View.tsx` и `config.ts`.
2. В `config.ts` экспортируйте `{ id, title, path, component, icon }`.
3. Перезапустите dev-сервер — модуль появится в сайдбаре и маршрутах.

```ts
// src/modules/myfilter/config.ts
import { MyFilterView } from "./MyFilterView";
import { ImageIcon } from "lucide-react";

export default {
  id: "myfilter",
  title: "Мой фильтр",
  path: "/myfilter",
  component: MyFilterView,
  icon: ImageIcon,
};
```

---

### 🙋‍♂️ Зачем пользоваться этим репо?

* **Демо-продуктов** — живая ссылка вместо скриншотов.
* **Хакатоны / R&D** — быстро прототипируйте несколько эффектов в одном месте.
* **Обучение** — каждая папка — самодостаточный пример Canvas/WebGL.
* **Design tokens** — проверка радиусов и палитр на реальных изображениях.
* **Vibe coding** — Можешь добавлять модули при помощи нейронки, но убедись, что не пушишь хлам

---

*Приятного пользования! Буду рад вашим pull-request.*
