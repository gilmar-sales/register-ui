import React from "react";

import { ReactComponent as Logo } from "./logo.svg";

const LogoIcon: React.FC<{
  width: number | string;
  height: number | string;
  color?: string;
}> = ({ color, ...props }) => {
  return <Logo {...props} stroke={color || "black"} />;
};

export default LogoIcon;
