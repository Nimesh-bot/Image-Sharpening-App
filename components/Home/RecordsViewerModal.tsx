import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'

import { RecordType } from '../../@types/record'

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { IModalProps } from '../../@types/modal';

const globalStyles = require('../../styles/global')
const imageWidth = Dimensions.get('window').width - 50;

const RecordsViewerModal = ({ modalVisible, closeModal, record }: IModalProps) => {
    const [isOriginal, setIsOriginal] = useState(true);
  
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View style={globalStyles.container}>
                <View style={globalStyles.header}>
                    <Text style={globalStyles.headingText}>Record - {record.date}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={closeModal}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons name="delete" size={24} color="#1E56A0" style={{ marginLeft: 10 }}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.capsule}>
                    <TouchableOpacity style={isOriginal ? styles.selectedOriginal : styles.original} onPress={() => setIsOriginal(true)}>
                        <Text style={isOriginal && styles.selectedText}>Original</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={!isOriginal ? styles.selectedResult : styles.result} onPress={() => setIsOriginal(false)}>
                        <Text style={!isOriginal && styles.selectedText}>Result</Text>
                    </TouchableOpacity>
                </View>

                <Image source={isOriginal ? record.original : record.result} style={styles.image} />
            </View>
        </Modal>
    )
}

export default RecordsViewerModal

const styles = StyleSheet.create({
    capsule: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 180,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        marginTop: 40,
    },
    original: {
        width: 90,
        height: 80,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedOriginal: {
        width: 90,
        height: 40,
        backgroundColor: '#1E56A0',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    result: {
        width: 90,
        height: 80,
        backgroundColor: 'transparent',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedResult: {
        width: 90,
        height: 40,
        backgroundColor: '#1E56A0',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedText: {
        color: '#fff',
    },
    image: {
        // get the width of the screen
        width: imageWidth,
        height: 'auto',
        aspectRatio: 1/1,
        borderRadius: 14,
        marginTop: 40,
    }
})  