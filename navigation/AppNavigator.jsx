import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Register from '../components/Register';
import Menu from '../components/Menu';
import Gift from '../components/Gift';

const Stack = createStackNavigator();

export default function AppNavigator({ user }) {
    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen name="Menu">
                        {(props) => <Menu {...props} user={user} />}
                    </Stack.Screen>
                    <Stack.Screen name="Gift">
                        {(props) => <Gift {...props} user={user} />}
                    </Stack.Screen>
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                </>
            )}
        </Stack.Navigator>
    );
}
