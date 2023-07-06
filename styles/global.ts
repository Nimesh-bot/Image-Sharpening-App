'use strict';
import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#eeeeee',
    },
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headingText: {
        fontSize: 18,
        fontWeight: '500',
    },
    subHeadingText: {
        fontSize: 16,
        fontWeight: '500',
    },
    text: {
        fontSize: 14,
    },
    body: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        marginTop: 20,
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    loadingContainer: {
        width: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputStyle: {
        height: 45,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#14141515',
        paddingHorizontal: 10,
    }
})