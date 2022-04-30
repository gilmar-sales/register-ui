import { Flex, Divider } from "@chakra-ui/react";
import React, { useContext } from "react";

import LogoIcon from "../LogoIcon";
import {
  MdOutlineAssignment,
  MdOutlineDashboard,
  MdExitToApp,
} from "react-icons/md";
import TabButton from "../TabButton";
import AuthContext from "../../contexts/AuthContext";

const TabsPanel: React.FC = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      height="100vh"
      width="5rem"
      shadow={"md"}
    >
      <Flex width={"100%"} flexDirection={"column"} alignItems="center">
        <LogoIcon color={"#39E991"} width={"3rem"} height={"3rem"} />
        <Divider margin="0.3rem" />
        {authCtx.user.role === "administrator" ? (
          <TabButton
            to="/dashboard"
            label="Dashboard"
            icon={<MdOutlineDashboard strokeWidth={"0px"} size={"2.5rem"} />}
          />
        ) : (
          <TabButton
            to="/registers"
            label="Registers"
            icon={<MdOutlineAssignment size={"2.5rem"} />}
          />
        )}
        <Divider margin="0.3rem" />
      </Flex>
      <Flex width={"100%"} flexDirection={"column"} alignItems="center">
        <Divider margin="0.3rem" />
        <TabButton
          to="/"
          icon={<MdExitToApp size={"2.5rem"} />}
          onClick={() => authCtx.handleLogout()}
        />
      </Flex>
    </Flex>
  );
};

export default TabsPanel;
