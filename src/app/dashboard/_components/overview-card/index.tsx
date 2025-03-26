"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewCardProps {
  title: string;
  value: string;
  icon: string;
}

export const OverviewCard = ({ title, value, icon }: OverviewCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <span className={`text-2xl text-primary`}>{icon}</span>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
};
