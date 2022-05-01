import {
  Box,
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

interface RegistersListProps {
  registers: Register[];
}

const RegistersList: React.FC<RegistersListProps> = ({ registers }) => {
  return (
    <TableContainer w="100%" overflow={"auto"}>
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
            <Tr key={register.id}>
              <Td padding="1rem" bg="white" borderLeftRadius="1rem">
                <Flex alignItems="center">
                  <Box
                    width="5px"
                    height="2rem"
                    bg={register.type === "in" ? "green.300" : "red.300"}
                    marginRight="20%"
                    borderRadius="1rem"
                  />
                  <Box>
                    <Text fontSize={{ sm: "sm", md: "md", lg: "2xl" }}>
                      {register.user.name}
                    </Text>
                    <Text fontSize="xs">
                      {Number(register.user.id).toString().padStart(3, "0")}
                    </Text>
                  </Box>
                </Flex>
              </Td>
              <Td bg="white">
                <Text color="blackAlpha.500" fontSize="2xl">
                  {`${new Date(register.timeRegistered).toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    }
                  )}`}
                </Text>
              </Td>
              <Td bg="white" borderRightRadius="1rem" isNumeric>
                <Text color="blackAlpha.600" fontWeight="bold" fontSize="3xl">
                  {`${new Date(register.timeRegistered).toLocaleString(
                    "en-US",
                    {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}h`}
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RegistersList;
