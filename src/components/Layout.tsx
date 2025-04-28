// src/components/Layout.tsx
import React from "react";
import { Sidebar } from "./Sidebar.tsx";
import { moduleRegistry } from "@/lib/moduleRegistry.ts";
import { ThemeToggle } from "./ThemeToggle.tsx";
import { Toaster } from "@/components/ui/sonner.tsx"; // Импортируем переключатель темы

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Основной контент */}{" "}
      <aside className="w-64 border-l border-border p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Обработка</h2>
          <ThemeToggle /> {/* Переключатель темы в сайдбаре */}
        </div>
        <Sidebar modules={moduleRegistry} />
        {/* Можно добавить сюда глобальные настройки или другую информацию */}
      </aside>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        {/* Можно добавить Header сюда, если нужно */}
        {/* <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Image Processor</h1>
          <ThemeToggle />
        </header> */}
        {children}
      </main>
      {/* Правая панель навигации */}
      <Toaster />
    </div>
  );
}
