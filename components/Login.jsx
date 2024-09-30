import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { firebase } from './firebase';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View>
            <Text>Логин</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Войти" onPress={handleLogin} />
            <Button title="Зарегистрироваться" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}
