import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import Register from "../../@types/Register";
import LogoIcon from "../../components/LogoIcon";
import TabsPanel from "../../components/TabsPanel";

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
  const { data, loading } = useQuery(REGISTERS);

  const registers = data.findUserRegisters as Register[];

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
          <LogoIcon height="5rem" width="5rem" />
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
              <Button
                size="lg"
                colorScheme="green"
                borderRadius="none"
                fontWeight="extrabold"
              >
                Register
              </Button>
            </Flex>

            <Flex justifyContent="center" width="100%">
              <TableContainer w="100%">
                <Table
                  variant="unstyled"
                  size="lg"
                  style={{
                    borderSpacing: "0 1rem",
                    borderCollapse: "separate",
                  }}
                >
                  <Thead>
                    <Tr>
                      <Th>Collaborator</Th>
                      <Th>Date</Th>
                      <Th>Hour</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {registers.map((register) => (
                      <Tr>
                        <Td padding="1rem" bg="white" borderLeftRadius="1rem">
                          <Flex alignItems="center">
                            <Box
                              width="5px"
                              height="2rem"
                              bg="green.300"
                              marginRight="25%"
                              borderRadius="1rem"
                            />
                            <Box>
                              <Text fontSize="2xl">{register.user.name}</Text>
                              <Text fontSize="xs">
                                {Number(register.user.id)
                                  .toString()
                                  .padStart(3, "0")}
                              </Text>
                            </Box>
                          </Flex>
                        </Td>
                        <Td bg="white">
                          <Text color="blackAlpha.500" fontSize="2xl">
                            {`${new Date(
                              register.timeRegistered
                            ).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })}`}
                          </Text>
                        </Td>
                        <Td bg="white" borderRightRadius="1rem" isNumeric>
                          <Text
                            color="blackAlpha.600"
                            fontWeight="bold"
                            fontSize="3xl"
                          >
                            {`${new Date(
                              register.timeRegistered
                            ).toLocaleString("en-US", {
                              hour12: false,
                              hour: "2-digit",
                              minute: "2-digit",
                            })}h`}
                          </Text>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Registers;
