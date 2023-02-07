import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface IAppBarProps {
    title: string
}

const globalStyles = require('../styles/global')

const AppBar = ({ title }: IAppBarProps) => {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.headingText}>{title}</Text>
    </View>
  )
}

export default AppBar

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
})