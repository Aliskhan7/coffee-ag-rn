// app/(authenticated)/gift.tsx
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '@/Context/AuthContext';
import { firestore } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Gift() {
    const [recipientEmail, setRecipientEmail] = useState('');
    const [giftMessage, setGiftMessage] = useState('');
    const { user } = useContext(AuthContext);

    const handleGift = async () => {
        try {
            await addDoc(collection(firestore, 'gifts'), {
                from: user?.email,
                to: recipientEmail,
                message: giftMessage,
                timestamp: serverTimestamp(),
            });
            alert('Кофе подарен!');
            setRecipientEmail('');
            setGiftMessage('');
        } catch (error: any) {
            alert(error.message);
        }
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
                autoCapitalize="none"
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

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 8 },
});
