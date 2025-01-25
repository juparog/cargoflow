"use client";

import { ModeToggle } from "@/components/global/mode-toogle";
import { Tooltip } from "@/components/global/tooltip";
import { Button } from "@/components/ui";
import { LogIn, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const NavBarPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div className="text-3xl font-semibold flex items-center gap-x-3">
          <Image alt="logo" src="/cargoflow-logo.svg" width={40} height={40} />
          <div>
            <span className="text-themeTextWhite">Cargo</span>
            <span className="text-primary">Flow</span>
          </div>
        </div>
        {/* <div className="hidden gap-x-10 items-center lg:flex">
          <Link
            href="#inicio"
            className="bg-primary py-2 px-5 font-semibold text-lg rounded-full hover:bg-primary/80"
          >
            Inicio
          </Link>
          <Link href="#nosotros">Nosotros</Link>
        </div> */}
        <div className="flex items-center gap-x-4">
          <ModeToggle />
          {session ? (
            <>
              <Link href="/dashboard">
                <Button className="text-base flex gap-x-2">Dashboard</Button>
              </Link>
              <Tooltip content="Cerrar sesión">
                <Button
                  onClick={() => signOut()}
                  className="text-base"
                  variant="outline"
                >
                  <LogOut />
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  className="text-base flex gap-x-2 bg-transparent"
                  variant="outline"
                >
                  <LogIn /> Iniciar sesión
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="text-base flex gap-x-2">Regístrate</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBarPage;
