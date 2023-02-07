import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons';

import { IModalProps } from '../../@types/modal'
import Toast from 'react-native-toast-message';
import useProcessImage from '../../hooks/useProcessImage';
import { BASE_URL } from '../../config/axios.config';

const globalStyles = require('../../styles/global')
const imageWidth = Dimensions.get('window').width - 50;

const SharpenModal = ({ modalVisible, closeModal, image }: IModalProps) => {
    const [sharpened, setSharpened] = React.useState(false);
    const [result, setResult] = React.useState<any>(null);

    const handleSuccess = (data: any) => {
        console.log('data: ', data.data);
        Toast.show({
            type: 'success',
            text1: 'Image Sharpened',
        })
        setSharpened(true);
        setResult(data.data.sharpened_path)
    }
    const handleError = (error: any) => {
        console.log(error);
        Toast.show({
            type: 'error',
            text1: 'Something went wrong. Please try again',
        })
    }

    const { mutate, isLoading } = useProcessImage(
        handleSuccess,
        handleError
    )

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('file', image);
        mutate(formData);
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <ScrollView>
                <View style={globalStyles.container}>
                    <View style={globalStyles.header}>
                        <Text style={globalStyles.headingText}>Sharpen</Text>
                        <TouchableOpacity onPress={closeModal}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 40 }}>
                        {
                            sharpened &&
                            <Text>Original Image</Text>
                        }
                        <Image source={image} style={styles.image} />
                    </View>
                    {
                        sharpened &&
                        <View style={{ marginVertical: 40 }}>
                            <Text>Sharpened Image</Text>
                            <Image source={{ uri: `${BASE_URL}${result.split(':8000/')[1]}` }} style={styles.image} />
                        </View>
                    }

                    {
                        !sharpened &&
                        <TouchableOpacity style={styles.button} onPress={onSubmit}>
                            <Text style={styles.buttonText}>Sharpen</Text>
                        </TouchableOpacity>
                    }
                </View>
            </ScrollView>
        </Modal>
    )
}

export default SharpenModal

const styles = StyleSheet.create({
    image: {
        width: imageWidth,
        height: 'auto',
        aspectRatio: 1,
        borderRadius: 14,
        marginTop: 10
    },
    button: {
        backgroundColor: '#1E56A0',
        padding: 14,
        borderRadius: 14,
        width: Dimensions.get('window').width - 50,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    }
})
