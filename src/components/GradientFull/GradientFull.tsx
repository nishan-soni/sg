import { Box, Button, Icon } from "@chakra-ui/react";
import { MdFullscreenExit } from "react-icons/md";
import "./GradientFull.css";

const GradientFull = (props: any) => {
  const { rgbString, setGradientFullScreen } = props;
  return (
    <div id="gradient-full-container">
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
            setGradientFullScreen(false);
          }}
        >
          <Icon as={MdFullscreenExit} w={6} h={6} />
        </Button>
      </Box>
    </div>
  );
};

export default GradientFull;
