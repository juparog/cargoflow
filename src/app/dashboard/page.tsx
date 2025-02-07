"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Transportes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total: 123</p>
          {/* Aquí puedes incluir gráficos o datos relevantes */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paquetes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total: 456</p>
          {/* Información relevante de paquetes */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No leídas: 7</p>
          {/* Resumen de notificaciones */}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
