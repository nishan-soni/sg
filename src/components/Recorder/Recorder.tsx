import { Button, Center, Heading, HStack, Progress } from "@chakra-ui/react";
import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
import { useState } from "react";
import { BsPlayFill, BsFillStopFill } from "react-icons/bs";
import "./Recorder.css";

function Recorder(props: any) {
  const timerTime = 150
  const { setReqData, recording, setRecording, rgbString } = props;
  const [init, setInit] = useState(false);

  const [time, setTime] = useState(timerTime);
  let playing: any = false;

  async function initAudio() {
    await register(await connect());

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        let audioChunks: BlobPart[] = [];
        let recorder = new MediaRecorder(stream, { mimeType: "audio/wav" });

        const startButton = document.getElementById("play-button");

        let timer: NodeJS.Timer | undefined;

        startButton?.addEventListener("click", () => {
          if (playing === false) {
            recorder.start();
            playing = true;
            setRecording(true);

            let timeleft = timerTime;
            timer = setInterval(function () {
              if (timeleft <= 0) {
                clearInterval(timer);
                recorder.stop();
                playing = false;
                setRecording(false);
              }
              timeleft -= 1;
              setTime(timeleft);
            }, 100);
          } else if (playing === true) {
            recorder.stop();
            playing = false;
            setRecording(false);
          }
          console.log(recorder.state);
        });

        recorder.onstop = async () => {
          clearInterval(timer);
          setTime(timerTime);
          let blob = new Blob(audioChunks, { type: "audio/wav" });
          let reader = new FileReader();
          let base64String;
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            base64String = reader.result;
            setReqData(base64String);
          };
          // Reseting the audio chunks array
          audioChunks = [];
        };
        recorder.ondataavailable = (e) => {
          audioChunks.push(e.data);
        };
        setInit(true);
      })
      .catch((e) => console.log(e));
  }

  function onPlay() {
    if (init === false) {
      initAudio();
    }
  }

  return (
    <div id="recorder-container">
      <Center>
        <HStack>
          <Button
            id="play-button"
            color='black'//"#40c9ff"
            variant="ghost"
            fontSize="1.5rem"
            onClick={onPlay}
          >
            {recording === true ? <BsFillStopFill /> : <BsPlayFill />}
          </Button>
          <Progress
            width="40vw"
            colorScheme="purple"
            size="xs"
            isIndeterminate={recording === true ? true : false}
          />
          <div id="time">
            <Heading
              fontSize="1.3rem"
              bgGradient= {rgbString} //"linear(to-r, #0061ff, #45caff)"
              bgClip="text"
            >
              {time / 10}s
            </Heading>
          </div>
        </HStack>
      </Center>
    </div>
  );
}

export default Recorder;
