"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar as BarChart, Pie as PieChart } from "react-chartjs-2";
import { OverviewCard } from "./_components/overview-card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardInicio() {
  const chartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Paquetes entregados",
        data: [120, 200, 150, 80, 70],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <OverviewCard title="Empresas" value="12" icon="building" />
        <OverviewCard title="Transportes" value="45" icon="truck" />
        <OverviewCard title="Paquetes" value="320" icon="package" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Paquetes por mes</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={chartData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Estado de los paquetes</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={{
                labels: ["Pendiente", "En curso", "Completado"],
                datasets: [
                  {
                    data: [50, 30, 20],
                    backgroundColor: ["#ef4444", "#f97316", "#22c55e"],
                  },
                ],
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
