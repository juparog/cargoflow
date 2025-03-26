"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar as BarChart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DashboardReportes() {
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
      <h1 className="text-2xl font-bold mb-6">Reportes</h1>

      {/* Gráfico */}
      <div className="mb-6">
        <BarChart data={chartData} />
      </div>

      {/* Tabla de reportes */}
      <div>
        <p className="text-lg font-semibold mb-2">Detalles de entregas</p>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Mes</th>
              <th className="border p-2">Entregas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Enero</td>
              <td className="border p-2">120</td>
            </tr>
            <tr>
              <td className="border p-2">Febrero</td>
              <td className="border p-2">200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
