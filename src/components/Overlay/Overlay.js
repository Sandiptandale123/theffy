import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
const Overlay = (props) => {
    const { navigation, subjectName, onPressOut, modelName } = props;
    return (
        <TouchableOpacity onPress={onPressOut} style={styles.overlayView} >
            <View />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    overlayView: { backgroundColor: 'black', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, opacity: 0.5 }
});
export default Overlay;