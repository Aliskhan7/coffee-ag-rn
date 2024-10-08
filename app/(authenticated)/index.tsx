import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import firebase from '../../firebase';

interface MenuItem {
    id: string;
    name: string;
    price: number;
}

export default function MenuScreen() {
    const router = useRouter();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('menu')
            .onSnapshot((snapshot) => {
                const items: MenuItem[] = [];
                snapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...(doc.data() as MenuItem) });
                });
                setMenuItems(items);
            });

        return () => unsubscribe();
    }, []);

    const logout = () => {
        firebase.auth().signOut().then(() => {
            router.replace('(auth)/login');
        });
    };

    return (
        <View style={styles.container}>
            {menuItems.map((item) => (
                <View key={item.id} style={styles.item}>
                    <Text>
                        {item.name} - {item.price}₽
                    </Text>
                    <Button title="Заказать" onPress={() => alert('Заказ оформлен!')} />
                </View>
            ))}
            <Button title="Подарить кофе" onPress={() => router.push('gift')} />
            <Button title="Выйти" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    item: {
        marginBottom: 15,
    },
});
