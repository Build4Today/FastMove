import { Camera } from "expo-camera";
import * as TextRecognition from "expo-text-recognition";

export const performOCR = async (): Promise<string> => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Camera permission not granted");
  }

  const camera = await Camera.getAvailableCameraTypesAsync();
  if (camera.length === 0) {
    throw new Error("No camera available");
  }

  const result = await Camera.takePictureAsync({
    quality: 1,
    base64: true,
  });

  if (result.base64) {
    const { text } = await TextRecognition.recognizeText(result.base64);
    return text;
  }

  return "";
};
