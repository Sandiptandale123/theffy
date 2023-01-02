
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';


export function razorPay(props) {
    const { successPayment, failurePayment, itemAmount, itemImage, itemName, userEmail, userContact, userName } = props;

    var options = {
        description: itemName,
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_live_FH1N5uUyChEFWj',
        amount: itemAmount * 100,
        name: 'SGLearning',
        prefill: {
            email: userEmail,
            contact: userContact,
            name: userName
        },
        theme: { color: '#F37254' }
    }
    RazorpayCheckout.open(options).then((data) => {
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
        return successPayment(data);
    }).catch((error) => {
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
        return failurePayment(error);
    });
}
    // stripePay = () => {
    //     alert('hi');
    // }



