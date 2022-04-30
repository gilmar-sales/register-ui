import { Flex } from "@chakra-ui/react";
import React from "react";
import TabsPanel from "../../components/TabsPanel";

const Dashboard: React.FC = () => {
  return (
    <Flex gridArea="1fr 1fr">
      <TabsPanel />
      Dashboard
    </Flex>
  );
};

export default Dashboard;
