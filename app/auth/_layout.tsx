import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import firebase from '@/firebaseConfig';

export default function AppLayout() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                router.replace('(auth)/login');
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return null; // Или индикатор загрузки
    }

    return (
        <Stack
            screenOptions={{
                headerTitleAlign: 'center',
            }}
        />
    );
}
