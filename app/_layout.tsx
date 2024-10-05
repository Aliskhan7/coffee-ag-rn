import React from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '@/Context/AuthContext';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
