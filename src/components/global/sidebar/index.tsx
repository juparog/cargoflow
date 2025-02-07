import { Button, Separator } from "@/components/ui";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuProps } from "@/constants/menus";
import clsx from "clsx";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { BrandLogo } from "../brand-logo";

type Props = {
  sidebarLogo: string;
  sidebarOpt: MenuProps[];
  defaultOpen?: boolean;
};

const Sidebar = ({ sidebarLogo, sidebarOpt, defaultOpen }: Props) => {
  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:!hidden felx"
      >
        <Button variant="outline" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={clsx(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <SheetDescription hidden>Description goes here</SheetDescription>
        <div>
          <AspectRatio ratio={16 / 5}>
            <BrandLogo logoSrc={sidebarLogo} />
          </AspectRatio>
          <SheetTitle
            className="text-muted-foreground text-xs mb-2"
            aria-describedby="menu links"
          >
            MENU
          </SheetTitle>
          <Separator className="mb-4" />
          <nav className="relative">
            <Command className="rounded-lg overflow-visible bg-transparent">
              <CommandInput placeholder="Search..." />
              <CommandList className="py-4 overflow-visible">
                <CommandEmpty>No Results Found</CommandEmpty>
                <CommandGroup className="overflow-visible">
                  {sidebarOpt.map((sidebarOptions) => {
                    return (
                      <CommandItem
                        key={sidebarOptions.id}
                        className="md:w-[320px] w-full"
                      >
                        <Link
                          href={sidebarOptions.path}
                          className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                        >
                          {sidebarOptions.icon}
                          <span>{sidebarOptions.label}</span>
                        </Link>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
