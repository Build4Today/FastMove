import { ImagePicker } from "expo-image-picker";
import { TextRecognizer } from "expo-text-recognition";

export const performOCR = async (): Promise<string> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Camera permission not granted");
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.cancelled) {
    const { uri } = result;
    const { data } = await TextRecognizer.recognizeTextAsync(uri);
    return data;
  }

  return "";
};
