import { Button, Flex, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface TabButtonProps {
  icon: ReactElement;
  label?: string;
  to: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const TabButton: React.FC<TabButtonProps> = (props) => {
  return (
    <Link to={props.to} onClick={props.onClick} style={{ width: "100%" }}>
      <Button
        padding={0}
        borderRadius={0}
        height="auto"
        color="green.400"
        variant="ghost"
        width="100%"
      >
        <Flex direction="column" alignItems="center">
          {props.icon}
          <Text fontWeight="normal" fontSize="sm">
            {props.label}
          </Text>
        </Flex>
      </Button>
    </Link>
  );
};

export default TabButton;
