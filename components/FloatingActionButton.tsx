import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

interface IFloatingActionButtonProps {
  handleOpenCamera?: () => void;
  handleImagePicker?: () => void;
}

const FloatingActionButtonCamera = ({
  handleOpenCamera,
}: IFloatingActionButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.floatingCameraButtonStyles}
      onPress={handleOpenCamera}
    >
      <MaterialIcons name="camera" size={24} color="#1E56A0" />
    </TouchableOpacity>
  );
};
const FloatingActionButtonImage = ({
  handleImagePicker,
}: IFloatingActionButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.floatingImageButtonStyles}
      onPress={handleImagePicker}
    >
      <MaterialIcons name="image" size={24} color="#1E56A0" />
    </TouchableOpacity>
  );
};

export { FloatingActionButtonCamera, FloatingActionButtonImage };

const styles = StyleSheet.create({
  floatingCameraButtonStyles: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#eeeeee",
    padding: 14,
    borderRadius: 50,
  },

  floatingImageButtonStyles: {
    position: "absolute",
    bottom: 20,
    right: 80,
    backgroundColor: "#eeeeee",
    padding: 14,
    borderRadius: 50,
  },
});
