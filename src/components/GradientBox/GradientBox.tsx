import { Box, Button, Icon } from "@chakra-ui/react";
import { MdFullscreen } from "react-icons/md";

import "./GradientBox.css";
const GradientBox = (props: any) => {
  const { rgbString, setGradientFullScreen } = props;
  return (
    <div id="gradient-container">
      <Box
        w="100%"
        h="100%"
        border="1px solid lightgray"
        borderRadius="15px"
        bgGradient={rgbString}
      >
        <Button
          className="more-button"
          colorScheme="whiteAlpha"
          size="sm"
          onClick={() => {
            setGradientFullScreen(true);
          }}
        >
          <Icon as={MdFullscreen} w={6} h={6} />
        </Button>
      </Box>
    </div>
  );
};

export default GradientBox;
