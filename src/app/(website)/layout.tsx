import React from "react";
import NavBarPage from "./_components/navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col py-5 xl:px-2 container">
      <NavBarPage />
      {children}
    </div>
  );
};

export default Layout;
