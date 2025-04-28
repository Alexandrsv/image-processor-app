// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { moduleRegistry } from "@/lib/moduleRegistry";
import { Toaster } from "@/components/ui/sonner.tsx";
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          {/* Оборачиваем все в Layout */}
          <Routes>
            {/* Динамически создаем роуты из реестра */}
            {moduleRegistry.map((module) => (
              <Route
                key={module.id}
                path={module.path}
                element={<module.component />}
              />
            ))}
            {/* TODO: Добавить стартовую страницу или редирект на первый модуль */}
            <Route path="*" element={<div>Страница не найдена</div>} />
            {/* Можно сделать редирект на первый модуль по умолчанию */}
            {/* <Route index element={<moduleRegistry[0].component />} />*/}
          </Routes>
        </Layout>
      </Router>
      <Toaster /> {/* Место для отображения уведомлений Shadcn */}
    </ThemeProvider>
  );
}

export default App;
