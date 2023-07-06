import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'

import { MaterialIcons } from '@expo/vector-icons'
;
import { BASE_URL } from '../../config/axios.config';

import RecordsViewerModal from './RecordsViewerModal';

import { useSelector, useDispatch } from 'react-redux';
import { Result, getResults } from '../../redux/apiSlice';
import { RootState } from '../../redux/store.js';

const globalStyles = require('../../styles/global')

interface Data {
    results: string[],
}

const PastRecords = () => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [record, setRecord] = React.useState<Data>()

    const { loading, results } = useSelector((state: RootState) => ({ ...state.api }))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getResults() as any)
    }, [dispatch])

    console.log(results, BASE_URL)
    
    if(loading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E56A0" />
            </View>
        )
    }

    return (
        <>
            <View>
                <View style={globalStyles.header}>
                    <Text style={globalStyles.headingText}>Past Records</Text>
                    <MaterialIcons name="clear-all" size={24} color="black" />
                </View>
                <View style={styles.recordsGrid}>
                    {
                        results?.map((item: any, index: number) => (
                            <Pressable style={styles.records} key={index} onPress={() => {setRecord(item); setModalVisible(true)}}>
                                <View style={styles.imageStack}>
                                    <Image source={{ uri: `${BASE_URL}/output/${item}/original.jpg`}} style={styles.original } />
                                    <Image source={{ uri: `${BASE_URL}/output/${item}/sharpened.jpg`}} style={styles.sharpened } />
                                </View>
                                <Text style={globalStyles.text}>{item}</Text>
                            </Pressable>
                        ))
                    }
                </View>
            </View>
            {
                modalVisible && 
                <RecordsViewerModal
                    modalVisible={modalVisible}
                    closeModal={() => setModalVisible(false)}
                    record={record}
                    setModal={setModalVisible}
                />
            }
        </>
    )
}

export default PastRecords

const styles = StyleSheet.create({
    recordsGrid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    records: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 25,
        marginBottom: 20,
    },
    imageStack: {
        position: 'relative',
        marginBottom: 20,
    },
    original: {
        width: 80,
        height: 80,
        borderRadius: 10,
        tintColor: 'gray',
    },
    sharpened: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 80,
        height: 80,
        borderRadius: 10,
    }
})