import React, { Dispatch, FormEventHandler, useContext, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Portal,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AuthContext from "../../contexts/AuthContext";
import { gql, useMutation } from "@apollo/client";
import Register from "../../@types/Register";

interface CreateRegisterDrawerProps {
  btnRef: React.RefObject<HTMLButtonElement>;
  setRegisters: Dispatch<React.SetStateAction<Register[]>>;
  registers: Register[];
}

const CREATE_REGISTER = gql`
  mutation createRegister($timeRegistered: DateTime!, $type: String!) {
    createRegister(data: { timeRegistered: $timeRegistered, type: $type }) {
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

const CreateRegisterDrawer: React.FC<CreateRegisterDrawerProps> = ({
  btnRef,
  setRegisters,
  registers,
}) => {
  const authCtx = useContext(AuthContext);

  const [createRegister] = useMutation(CREATE_REGISTER);
  const [timeRegistered, setTimeRegistered] = useState("");
  const [type, setType] = useState("in");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dateRef = React.useRef<HTMLInputElement>(null);
  const portalRef = React.useRef<HTMLDivElement>(null);

  const onSubmitRegister: FormEventHandler = (event) => {
    event.preventDefault();

    createRegister({
      variables: { timeRegistered: timeRegistered, type: type },
    })
      .then((response) => {
        setRegisters([response.data.createRegister, ...registers]);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  btnRef.current?.addEventListener("click", () => onOpen());

  return (
    <>
      <Portal containerRef={portalRef}> </Portal>
      <Box ref={portalRef} hidden={!isOpen}></Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        initialFocusRef={dateRef}
        portalProps={{ containerRef: portalRef }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Text>New Register</Text>
          </DrawerHeader>

          <DrawerBody>
            <form id="register-form" onSubmit={onSubmitRegister}>
              <Text>Collaborator</Text>
              <Text fontSize="2xl" mb="2rem">
                {authCtx.user.name}
              </Text>
              <Text>Date/Hour</Text>
              <Input
                onChange={(dateTime) =>
                  setTimeRegistered(dateTime.target.value)
                }
                value={timeRegistered}
                ref={dateRef}
                type="datetime-local"
                mb="2rem"
              />
              <Text>Type</Text>
              <Select
                name="type"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="in">In</option>
                <option value="out">Out</option>
              </Select>
            </form>
          </DrawerBody>

          <Divider />
          <DrawerFooter>
            <Button
              type="submit"
              form="register-form"
              borderRadius="none"
              size="lg"
            >
              Register
            </Button>
            <Button size="lg" variant="outline" ml="auto" onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateRegisterDrawer;
