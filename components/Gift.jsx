import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { firebase } from '../firebase';
import styles from './styles';

export default function Gift({ user }) {
    const [recipientEmail, setRecipientEmail] = useState('');
    const [giftMessage, setGiftMessage] = useState('');

    const handleGift = () => {
        firebase.firestore().collection('gifts').add({
            from: user.email,
            to: recipientEmail,
            message: giftMessage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
            .then(() => {
                alert('Кофе подарен!');
                setRecipientEmail('');
                setGiftMessage('');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Подарить кофе</Text>
            <Text>Введите email пользователя, которому хотите подарить кофе:</Text>
            <TextInput
                style={styles.input}
                placeholder="Email получателя"
                value={recipientEmail}
                onChangeText={setRecipientEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Сообщение"
                value={giftMessage}
                onChangeText={setGiftMessage}
            />
            <Button title="Подарить" onPress={handleGift} />
        </View>
    );
}
