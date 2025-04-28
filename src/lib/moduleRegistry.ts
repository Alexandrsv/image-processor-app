// src/lib/moduleRegistry.ts
import React from "react";
import { SquircleView } from "@/modules/squircle/SquircleView"; // Используем алиас @
import { squircleConfig } from "@/modules/squircle/config"; // Конфигурация модуля

// Определяем тип для конфигурации модуля
export interface ProcessingModule {
  id: string; // Уникальный идентификатор
  name: string; // Отображаемое имя в меню
  path: string; // Путь для роутера
  component: React.ComponentType; // Компонент для отображения
  icon?: React.ReactNode; // (Опционально) Иконка для меню
  // Можно добавить другие поля, например, описание
}

// Создаем массив (или объект) с зарегистрированными модулями
// Каждый модуль должен экспортировать свою конфигурацию (как squircleConfig)
// и свой основной компонент View (как SquircleView)
export const moduleRegistry: ProcessingModule[] = [
  {
    id: squircleConfig.id,
    name: squircleConfig.name,
    path: squircleConfig.path,
    component: SquircleView,
    // icon: <IconComponent />, // TODO: Добавить иконку
  },
  // --- Добавляйте сюда конфигурации других модулей ---
  // {
  //   id: 'brightness',
  //   name: 'Яркость/Контраст',
  //   path: '/brightness',
  //   component: BrightnessView, // Вам нужно будет создать этот компонент
  // },
];

// Функция для получения модуля по ID (может пригодиться)
export const getModuleById = (id: string): ProcessingModule | undefined => {
  return moduleRegistry.find((module) => module.id === id);
};

// Функция для получения модуля по Path (может пригодиться)
export const getModuleByPath = (path: string): ProcessingModule | undefined => {
  return moduleRegistry.find((module) => module.path === path);
};
