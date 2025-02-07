"use client";

import { InfoBar } from "@/app/dashboard/_components/infobar";
import BlurPage from "@/components/global/blur-page";
import Sidebar from "@/components/global/sidebar";
import { DASHBOARD_PAGE_MENU } from "@/constants/menus";

type Props = {
  children: React.ReactNode;
};

const LoadingDashboardPage = ({ children }: Props) => {
  return (
    <div className="h-screen overflow-hidden">
      <Sidebar
        defaultOpen={true}
        sidebarLogo="/cargoflow-logo.svg"
        sidebarOpt={DASHBOARD_PAGE_MENU}
      />
      <div className="md:pl-[300px]">
        <InfoBar />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
};

export default LoadingDashboardPage;
