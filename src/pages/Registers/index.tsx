import { Flex } from "@chakra-ui/react";
import React from "react";
import TabsPanel from "../../components/TabsPanel";

const Registers: React.FC = () => {
  return (
    <Flex gridArea="1fr 1fr">
      <TabsPanel />
      Registers
    </Flex>
  );
};

export default Registers;
