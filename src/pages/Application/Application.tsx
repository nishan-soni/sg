import { Button, Center, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import GradientBox from "../../components/GradientBox/GradientBox";
import GradientFull from "../../components/GradientFull/GradientFull";
import Recorder from "../../components/Recorder/Recorder";

const Application = () => {
  const [reqData, setReqData] = useState<string>("");
  const [rgbString, setRGBString] = useState<string>(
    "linear(to-r, #0061ff, #45caff)"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [gradientFullScreen, setGradientFullScreen] = useState(false);
  const [recording, setRecording] = useState(false);

  type RGB = {
    freq: number;
    r: number;
    g: number;
    b: number;
  };

  const generateRGB = (audioData: Array<RGB>) => {
    let gradientString: string;

    if (audioData.length === 1) {
      gradientString = "linear(to-r,rgb(255,240,245),";
    } else if (audioData.length === 0) {
      gradientString = "linear(to-r, #000000,#000000,";
    } else {
      gradientString = "linear(to-r,";
    }

    audioData.forEach((element: RGB) => {
      gradientString += `rgb(${element.r}, ${element.g}, ${element.b}),`;
    });
    gradientString = gradientString.slice(0, -1);
    gradientString += ")";
    setRGBString(gradientString);
  };

  const generateRequest = async () => {
    if (reqData !== "") {
      setLoading(true);
      axios({
        url: `https://sound-gradient.herokuapp.com/generate`,
        method: "POST",
        data: {
          base64String: reqData,
        },
      }).then((response) => {
        generateRGB(response.data);
        setLoading(false);
      });
    } else {
      console.log("req not made");
    }
  };
  return (
    <div>
      <div id="app-title" style={{ marginTop: "2vh" }}>
        <Center>
          <Heading
            id="app-title"
            fontSize="3.5rem"
            bgGradient={rgbString} //"linear(to-r, #0061ff, #45caff)"
            bgClip="text"
            marginLeft="5vw"
            marginRight="5vw"
            textAlign='center'
          >
            generate a gradient
          </Heading>
        </Center>
        <div>
          <Center>
            <Text fontSize="1.2rem" marginLeft="5vw" marginRight="5vw" textAlign='center'>
              a colour gradient will be generated when you record an audio clip
            </Text>
          </Center>
        </div>
      </div>
      <div>
        <GradientBox
          rgbString={rgbString}
          setGradientFullScreen={setGradientFullScreen}
        />
        {gradientFullScreen === true ? (
          <GradientFull
            rgbString={rgbString}
            setGradientFullScreen={setGradientFullScreen}
          />
        ) : null}
      </div>
      <div>
        <Recorder
          setReqData={setReqData}
          recording={recording}
          setRecording={setRecording}
          rgbString={rgbString}
        />
      </div>
      <div>
        <Center>
          <Text fontSize="0.8rem">
            click the button after you've stopped recording
          </Text>
        </Center>
      </div>
      <div>
        <Center marginTop="2vh">
          <Button
            onClick={generateRequest}
            isLoading={loading === true || recording === true ? true : false}
          >
            Generate
          </Button>
        </Center>
      </div>
    </div>
  );
};

export default Application;
