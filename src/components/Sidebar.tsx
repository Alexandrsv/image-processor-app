// src/components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { ProcessingModule } from "@/lib/moduleRegistry.ts";
import { Button } from "@/components/ui/button.tsx"; // Используем кнопку Shadcn
import { cn } from "@/lib/utils.ts"; // Утилита для объединения классов

interface SidebarProps {
  modules: ProcessingModule[];
}

export function Sidebar({ modules }: SidebarProps) {
  return (
    <nav className="flex flex-col space-y-2">
      {modules.map((module) => (
        <NavLink
          key={module.id}
          to={module.path}
          className={(
            { isActive }, // Используем функцию для определения активного состояния
          ) =>
            cn(
              "w-full justify-start", // Стили для кнопки внутри NavLink
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/50", // Активные/неактивные стили
            )
          }
        >
          {/* Оборачиваем содержимое в Button для стилизации */}
          <Button variant="ghost" className="w-full justify-start px-3">
            {/* {module.icon && <span className="mr-2">{module.icon}</span>} */}
            {module.name}
          </Button>
        </NavLink>
      ))}
    </nav>
  );
}
