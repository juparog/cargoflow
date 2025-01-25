"use client";

import GradientText from "@/components/global/gradient-text";
import { Button, Card } from "@/components/ui";
import { BadgePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WebsitePage() {
  return (
    <main className="flex flex-col items-center justify-center text-center gap-10 py-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-themeTextWhite gap-6">
        <h1 className="text-4xl lg:text-6xl font-bold">
          <span className="text-primary">Simplifica</span> tu logística con{" "}
          <span className="text-primary">CargoFlow</span>
        </h1>
        <p className="text-lg lg:text-xl dark:text-gray-300 light:text-gray-600 max-w-3xl">
          Una solución integral para gestionar y optimizar el flujo de carga y
          logística en un solo lugar. Desde el seguimiento en tiempo real hasta
          la gestión de inventarios.
        </p>
        <Link href="/sign-up">
          <Button className="px-8 py-3 text-lg bg-primary hover:bg-primary/80 rounded-full">
            ¡Empieza Ahora!
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <FeatureCard
          imageSrc="/feature1.svg"
          title="Gestión de Carga"
          description="Administra tus envíos y realiza un seguimiento en tiempo real."
        />
        <FeatureCard
          imageSrc="/feature2.svg"
          title="Optimización de Rutas"
          description="Ahorra tiempo y reduce costos con nuestras rutas inteligentes."
        />
        <FeatureCard
          imageSrc="/feature3.svg"
          title="Análisis Avanzado"
          description="Obtén informes detallados para mejorar tus decisiones logísticas."
        />
      </section>

      {/* Call-to-Action Section */}
      <div className="flex flex-col items-start md:items-center gap-y-5 md:gap-y-0">
        <GradientText
          className="text-[25px] md:text-[10px] lg:text-[25px] xl:text-[40px] 2xl:text-[50px] leading-tight font-semibold"
          element="H4"
        >
          ¿Listo para llevar tu logística al siguiente nivel?
        </GradientText>
        <p className="text-sm md:text-center text-left text-muted-foreground">
          Únete a cientos de empresas que ya confían en CargoFlow para gestionar
          su logística con éxito.
        </p>
        <div className="flex md:flex-row flex-col md:justify-center gap-5 md:mt-5 w-full">
          <Link href="/sign-in">
            <Button className="rounded-xl text-base flex gap-2 w-full">
              <BadgePlus /> Comienza Gratis
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

type FeatureCardProps = {
  imageSrc: string;
  title: string;
  description: string;
};

const FeatureCard = ({ imageSrc, title, description }: FeatureCardProps) => {
  return (
    <Card className="flex flex-col items-center text-center p-6  rounded-lg shadow-md">
      <Image
        src={imageSrc}
        alt={title}
        width={100}
        height={100}
        className="mb-4"
      />
      <h3 className="text-xl font-semibold text-themeTextWhite mb-2">
        {title}
      </h3>
      <p className="dark:text-gray-300 light:text-gray-600">{description}</p>
    </Card>
  );
};
