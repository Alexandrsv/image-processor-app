// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ModuleRegistry } from "@/lib/moduleRegistry";
import { Toaster } from "@/components/ui/sonner.tsx";
import { ThemeProvider } from "next-themes";

function App() {
  const FirstModule = ModuleRegistry[0].component;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="improc-ui-theme"
    >
      <Router basename={import.meta.env.BASE_URL}>
        <Layout>
          <Routes>
            {/* стартовая страница               */}
            <Route index element={<FirstModule />} />

            {/* динамические модули              */}
            {ModuleRegistry.map((module) => (
              <Route
                key={module.id}
                path={module.path}
                element={<module.component />}
              />
            ))}

            {/* fallback на 404 внутри SPA       */}
            <Route path="*" element={<div>Страница не найдена</div>} />
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
