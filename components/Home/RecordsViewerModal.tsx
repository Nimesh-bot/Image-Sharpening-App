import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'

import { RecordType } from '../../@types/record'

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { IModalProps } from '../../@types/modal';
import { BASE_URL } from '../../config/axios.config';
import Toast from 'react-native-toast-message';
import useDeleteRecord from '../../hooks/useDeleteRecord';
import { useDispatch } from 'react-redux';
import { getResults } from '../../redux/apiSlice';

const globalStyles = require('../../styles/global')
const imageWidth = Dimensions.get('window').width - 50;

const RecordsViewerModal = ({ modalVisible, closeModal, record, setModal }: IModalProps) => {
    const [isOriginal, setIsOriginal] = useState(true);
  
    const dispatch = useDispatch();

    const handleSuccess = (data: any) => {
        Toast.show(
            {
                type: 'success',
                text1: 'Record Deleted',
                text2: `Record ${record} has been deleted successfully`,
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            }
        )
        setModal(false);
        dispatch(getResults() as any)
    }

    const handleError = (error: any) => {
        console.log(error);
        Toast.show({
            type: 'error',
            text1: 'Something went wrong. Please try again',
        })
    }

    const { mutate, isLoading } = useDeleteRecord(
        handleSuccess,
        handleError
    ) 

    if(isLoading) {
        return (
            <Modal
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={globalStyles.loadingContainer}></View>
            </Modal>
        )
    }

    const onDelete = () => {
        mutate(record);
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View style={globalStyles.container}>
                <View style={globalStyles.header}>
                    <Text style={globalStyles.headingText}>Record - {record}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={closeModal}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDelete}>
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
                
                {
                    isOriginal ?
                    <Image source={{ uri: `${BASE_URL}/output/${record}/original.jpg` }} style={styles.image} />
                    :
                    <Image source={{ uri: `${BASE_URL}/output/${record}/sharpened.jpg` }} style={styles.image} />
                }
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