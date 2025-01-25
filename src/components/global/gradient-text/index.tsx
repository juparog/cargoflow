import { cn } from "@/lib/utils";

type Props = {
  element?: "H1" | "H2" | "H3" | "H4";
  children: React.ReactNode;
  className?: string;
};

const GradientText = ({ children, className, element }: Props) => {
  switch (element) {
    case "H1":
      return <h1 className={cn(className, "text-gradient")}>{children}</h1>;
    case "H2":
      return <h2 className={cn(className, "text-gradient")}>{children}</h2>;
    case "H3":
      return <h3 className={cn(className, "text-gradient")}>{children}</h3>;
    case "H4":
      return <h4 className={cn(className, "text-gradient")}>{children}</h4>;
    default:
      return <p className={cn(className, "text-gradient")}>{children}</p>;
  }
};

export default GradientText;
