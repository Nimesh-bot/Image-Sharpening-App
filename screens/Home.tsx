import { View, Text } from 'react-native'
import React from 'react'
import AppBar from '../components/AppBar'

import * as ImagePicker from "expo-image-picker";

import FloatingActionButton from '../components/FloatingActionButton'
import PastRecords from '../components/Home/PastRecords'
import { ImageType } from '../@types/imagePicker';
import SharpenModal from '../components/Home/SharpenModal';

const globalStyles = require('../styles/global')


const Home = () => {
  const [image, setImage] = React.useState<any>()
  const [modalVisible, setModalVisible] = React.useState(false)

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

  const handleCamera = async() => {
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
      setModalVisible(true)
    }
  }

  return (
    <View style={globalStyles.main}>
        <AppBar title="Home" />
        <View style={globalStyles.body}>
          <PastRecords />    
        </View>

        <FloatingActionButton 
          handleOpenCamera={handleCamera}
        />

        {
          modalVisible &&
          <SharpenModal 
            modalVisible={modalVisible}
            closeModal={() => setModalVisible(false)}
            record={null}
            image={image}
          />
        }
    </View>
  )
}

export default Home

