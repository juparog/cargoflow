import BackdropGradient from "@/components/global/backdrop-gradient";
import GlassCard from "@/components/global/glass-card";
import { ModeToggle } from "@/components/global/mode-toogle";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = async ({ children }: Props) => {
  return (
    <div className="container min-h-screen flex justify-center items-center overflow-hidden relative">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-2">
        <Button
          className="text-base flex gap-x-2 bg-transparent"
          variant="ghost"
        >
          <ArrowLeft /> Inicio
        </Button>
      </Link>

      <div className="flex flex-col w-full items-center py-18">
        <h2 className="text-4xl font-bold mt-5">
          <span className="text-themeTextWhite">Cargo</span>
          <span className="text-primary">Flow</span>
        </h2>
        <BackdropGradient
          className="w-4/12 h-2/6 opacity-40"
          container="flex flex-col items-center"
        >
          <GlassCard className="xs:w-full md:w-7/12 lg:w-5/12 xl:w-4/12 p-7 mt-6">
            {children}
          </GlassCard>
        </BackdropGradient>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ModeToggle />
      </div>
    </div>
  );
};

export default AuthLayout;
