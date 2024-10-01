import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { firebase } from '../firebase';
import styles from './styles';

const menuItems = [
    { id: '1', name: 'Эспрессо', price: 100 },
    { id: '2', name: 'Капучино', price: 150 },
    { id: '3', name: 'Латте', price: 150 },
    { id: '4', name: 'Американо', price: 120 },
    // Добавьте дополнительные позиции по необходимости
];

export default function Menu({ navigation, user }) {
    const handleOrder = (item) => {
        firebase.firestore().collection('orders').add({
            userId: user.uid,
            itemId: item.id,
            itemName: item.name,
            price: item.price,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
            .then(() => {
                alert('Заказ оформлен!');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Меню</Text>
            <Text>Добро пожаловать, {user.email}!</Text>
            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.menuItem}>
                        <Text>
                            {item.name} - {item.price}₽
                        </Text>
                        <Button title="Заказать" onPress={() => handleOrder(item)} />
                    </View>
                )}
            />
            <Button
                title="Подарить кофе"
                onPress={() => navigation.navigate('Gift')}
            />
        </View>
    );
}
