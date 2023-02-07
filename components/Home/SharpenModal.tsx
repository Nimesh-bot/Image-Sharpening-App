import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons';

import { IModalProps } from '../../@types/modal'

const globalStyles = require('../../styles/global')
const imageWidth = Dimensions.get('window').width - 50;

const SharpenModal = ({ modalVisible, closeModal, image }: IModalProps) => {
  return (
    <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
    >
        <View style={globalStyles.container}>
            <View style={globalStyles.header}>
                <Text style={globalStyles.headingText}>Sharpen</Text>
                <TouchableOpacity onPress={closeModal}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Image source={image} style={styles.image} />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sharpen</Text>
            </TouchableOpacity>
        </View>
    </Modal>
  )
}

export default SharpenModal

const styles = StyleSheet.create({
    image: {
        width: imageWidth,
        height: 'auto',
        aspectRatio: 1,
        marginVertical: 40,
        borderRadius: 14
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