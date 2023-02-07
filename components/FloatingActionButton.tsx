import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { MaterialIcons } from '@expo/vector-icons';

interface IFloatingActionButtonProps {
  handleOpenCamera: () => void
}

const FloatingActionButton = ({ handleOpenCamera }: IFloatingActionButtonProps) => {
  return (
    <TouchableOpacity style={styles.floatingButtonStyles} onPress={handleOpenCamera}>
      <MaterialIcons name="camera" size={24} color="#1E56A0" />
    </TouchableOpacity>
  )
}

export default FloatingActionButton

const styles = StyleSheet.create({
    floatingButtonStyles: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#eeeeee',
        padding: 14,
        borderRadius: 50
    }
})