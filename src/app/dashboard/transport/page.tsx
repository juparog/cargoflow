"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransportRecordTab } from "./_components/transport-record-tab";
import { VehicleTab } from "./_components/vehicle-tab";

export default function TransportPage() {
  return (
    <div className="p-6">
      <Tabs defaultValue="records">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="records">Registros</TabsTrigger>
          <TabsTrigger value="vehicles">Vehículos</TabsTrigger>
        </TabsList>

        <TabsContent value="records">
          <TransportRecordTab />
        </TabsContent>

        <TabsContent value="vehicles">
          <VehicleTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
