import {
  Box,
  Button,
  Center,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function App() {
  const [originalColor, setOriginalColor] = useState('#000000')
  const [red, setRed] = useState(0);
  const [color, setColor] = useState(originalColor);
  const [playing, setPlaying] = useState(false);

  function changeFunction() {
    if (red == 255) {
      setRed(0);
    } else {
      setRed(red + 1);
    }

    const newColor =
      "#" + dec2Hex(red) + color[2] + color[3] + color[4] + color[5];
    setColor(newColor);
    console.log(newColor, 'this new color!')
  }

  function dec2Hex(dec: number) {
    return Math.abs(dec).toString(16);
  }

  useEffect(() => {
    if (playing) {
      const ref = setInterval(changeFunction, 500);
      console.log('changing')
      return () => {
        clearInterval(ref);
      };
    }
  }, [playing, color]);

  function handlePlaying() {
    setPlaying(!playing);
  }

  return (
    <Center h="100vh">
      <VStack>
        <Box bg={color} rounded="lg" w="100px" h="100px" />
        <VStack spacing={5}>
          <Input onChange={(e) => setOriginalColor(e.target.value)} />

          <NumberInput step={1} defaultValue={1} min={1} max={35}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button onClick={handlePlaying}>{playing ? "Pause" : "Play"}</Button>
        </VStack>
      </VStack>
    </Center>
  );
}
