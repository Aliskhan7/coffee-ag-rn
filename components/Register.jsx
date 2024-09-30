import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { firebase } from '../firebase';
import styles from './styles';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('Login');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Регистрация</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Зарегистрироваться" onPress={handleRegister} />
            <Button
                title="Уже есть аккаунт?"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}
