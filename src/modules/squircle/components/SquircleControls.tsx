// src/modules/squircle/components/SquircleControls.tsx
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SquircleControlsProps {
  cornerRadius: number;
  setCornerRadius: (value: number) => void;
  smoothing: number;
  setSmoothing: (value: number) => void;
}

export function SquircleControls({
  cornerRadius,
  setCornerRadius,
  smoothing,
  setSmoothing,
}: SquircleControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки Скругления</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="cornerRadius">Радиус угла ({cornerRadius}px)</Label>
          <Slider
            id="cornerRadius"
            min={0}
            max={200} // Настройте максимальный радиус
            step={1}
            value={[cornerRadius]}
            onValueChange={(value) => setCornerRadius(value[0])}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="smoothing">
            Сглаживание ({smoothing.toFixed(2)})
          </Label>
          <Slider
            id="smoothing"
            min={0}
            max={1}
            step={0.01}
            value={[smoothing]}
            onValueChange={(value) => setSmoothing(value[0])}
          />
        </div>
      </CardContent>
    </Card>
  );
}
