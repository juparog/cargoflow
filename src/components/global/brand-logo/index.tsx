import Image from "next/image";
import React from "react";

interface BrandLogoProps {
  logoSrc?: string;
  logoAlt?: string;
  logoSize?: number;
  primaryText?: string;
  secondaryText?: string;
  primaryColorClass?: string;
  secondaryColorClass?: string;
  textSizeClass?: string;
  gapClass?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  logoSrc = "/cargoflow-logo.svg",
  logoAlt = "Logo",
  logoSize = 40,
  primaryText = "Cargo",
  secondaryText = "Flow",
  primaryColorClass = "text-themeTextWhite",
  secondaryColorClass = "text-primary",
  textSizeClass = "text-3xl font-semibold",
  gapClass = "gap-x-3",
}) => {
  return (
    <div className={`${textSizeClass} flex items-center ${gapClass}`}>
      <Image alt={logoAlt} src={logoSrc} width={logoSize} height={logoSize} />
      <div>
        <span className={primaryColorClass}>{primaryText}</span>
        <span className={secondaryColorClass}>{secondaryText}</span>
      </div>
    </div>
  );
};
