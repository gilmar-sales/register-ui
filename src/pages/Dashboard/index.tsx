import { gql, useQuery, useSubscription } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Register from "../../@types/Register";
import LogoIcon from "../../components/LogoIcon";
import RegistersList from "../../components/RegistersList";
import TabsPanel from "../../components/TabsPanel";

const ALL_REGISTERS = gql`
  query findAllRegisters {
    findAllRegisters {
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

const REGISTER_CREATED = gql`
  subscription registerCreated {
    registerCreated {
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

const Dashboard: React.FC = () => {
  const [registers, setRegisters] = useState<Register[]>([]);
  const { data: registersQueryData, loading } = useQuery(ALL_REGISTERS);
  const { data: registersSubData } = useSubscription(REGISTER_CREATED);

  useEffect(() => {
    if (registersQueryData) {
      setRegisters(registersQueryData.findAllRegisters);
    }
  }, [registersQueryData]);

  useEffect(() => {
    if (registersSubData) {
      setRegisters((registers) => [
        registersSubData.registerCreated,
        ...registers,
      ]);
    }
  }, [registersSubData]);

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
            <Flex justifyContent="center" width="100%">
              <RegistersList registers={registers} />
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Dashboard;
