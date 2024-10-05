// app/(authenticated)/index.tsx
import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '@/Context/AuthContext';
import { auth, firestore } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const menuItems = [
    { id: '1', name: 'Эспрессо', price: 100 },
    { id: '2', name: 'Капучино', price: 150 },
    // Добавьте дополнительные позиции по необходимости
];

export default function Home() {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const handleOrder = async (item: any) => {
        try {
            await addDoc(collection(firestore, 'orders'), {
                userId: user?.uid,
                itemId: item.id,
                itemName: item.name,
                price: item.price,
                timestamp: serverTimestamp(),
            });
            alert('Заказ оформлен!');
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Добро пожаловать, {user?.email}!</Text>
            <Button title="Выйти" onPress={handleLogout} />
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
            <Button title="Подарить кофе" onPress={() => router.push('/gift')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, marginBottom: 16 },
    menuItem: { marginVertical: 8 },
});
