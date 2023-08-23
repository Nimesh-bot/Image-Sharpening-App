import React from "react";
import { View } from "react-native";
import AppBar from "../components/AppBar";

import * as ImagePicker from "expo-image-picker";

import { ImageType } from "../@types/imagePicker";
import {
  FloatingActionButtonCamera,
  FloatingActionButtonImage,
} from "../components/FloatingActionButton";
import PastRecords from "../components/Home/PastRecords";
import SharpenModal from "../components/Home/SharpenModal";

const globalStyles = require("../styles/global");

const Home = () => {
  const [image, setImage] = React.useState<any>();
  const [modalVisible, setModalVisible] = React.useState(false);

  const typeForExpoImage = (image: ImageType) => {
    const localUri = image.assets[0].uri;
    const filename = localUri.split("/").pop();

    const match = /\.(\w+)$/.exec(filename as string);
    const type = match ? `image/${match[1]}` : `image`;

    return {
      uri: image.assets[0].uri,
      type: type,
      name: filename,
    };
  };

  const handleCamera = async () => {
    let cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (cameraPermission.granted === false) {
      alert("Camera permission is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.3,
    });

    if (!result.canceled) {
      setImage(typeForExpoImage(result as any));
      setModalVisible(true);
    }
  };

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  return (
    <View style={globalStyles.main}>
      <AppBar title="Home" />
      <View style={globalStyles.body}>
        <PastRecords />
      </View>

      <FloatingActionButtonCamera handleOpenCamera={handleCamera} />
      <FloatingActionButtonImage handleImagePicker={handleImagePicker} />

      {modalVisible && (
        <SharpenModal
          modalVisible={modalVisible}
          closeModal={() => setModalVisible(false)}
          record={null}
          image={image}
        />
      )}
    </View>
  );
};

export default Home;
