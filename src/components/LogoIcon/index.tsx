import { useTheme } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as Logo } from "./logo.svg";

const LogoIcon: React.FC<{
  size: number | string;
  color?: string;
}> = ({ color, size, ...props }) => {
  const theme = useTheme();

  return (
    <Logo
      {...props}
      width={size}
      height={size}
      stroke={color || theme.colors.green[300]}
    />
  );
};

export default LogoIcon;
