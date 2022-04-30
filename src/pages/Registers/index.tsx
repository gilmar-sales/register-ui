import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Button, Flex } from "@chakra-ui/react";

import Register from "../../@types/Register";
import LogoIcon from "../../components/LogoIcon";
import RegistersList from "../../components/RegistersList";
import TabsPanel from "../../components/TabsPanel";
import CreateRegisterDrawer from "../../components/CreateRegisterDrawer";

const REGISTERS = gql`
  query findUserRegisters {
    findUserRegisters {
      id
      timeRegistered
      type
      user {
        id
        name
        email
        role
      }
    }
  }
`;

const Registers: React.FC = () => {
  const [registers, setRegisters] = useState<Register[]>([]);

  const { data, loading } = useQuery(REGISTERS);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (data) {
      setRegisters(data.findUserRegisters);
    }
  }, [data]);

  return (
    <Flex>
      <TabsPanel />
      {loading ? (
        <Flex
          width="100%"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <LogoIcon size="5rem" />
        </Flex>
      ) : (
        <Flex
          bg="blackAlpha.100"
          width="100%"
          height="100vh"
          direction="column"
          alignItems="center"
          paddingTop="3rem"
          overflow="auto"
        >
          <Box width="80%">
            <Flex justifyContent="flex-end" width="100%" marginBottom="3rem">
              <Button ref={btnRef} size="lg" fontWeight="extrabold">
                Register
              </Button>
              <CreateRegisterDrawer
                btnRef={btnRef}
                setRegisters={setRegisters}
                registers={registers}
              />
            </Flex>

            <Flex justifyContent="center" width="100%">
              <RegistersList registers={registers} />
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Registers;
