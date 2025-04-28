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
      <Router>
        <Layout>
          <Routes>
            <Route index element={<FirstModule />} />

            {ModuleRegistry.map((module) => (
              <Route
                key={module.id}
                path={module.path}
                element={<module.component />}
              />
            ))}

            <Route path="*" element={<div>Страница не найдена</div>} />
          </Routes>
        </Layout>
      </Router>
      <Toaster /> {/* Место для отображения уведомлений Shadcn */}
    </ThemeProvider>
  );
}

export default App;
