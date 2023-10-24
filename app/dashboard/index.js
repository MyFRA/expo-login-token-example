import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native"
import * as Clipboard from 'expo-clipboard';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

export default function page() {

    const [expoPushToken, setExpoPushToken] = useState('');

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(expoPushToken);
    };

    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);

    const registerForPushNotificationsAsync = async () => {
        let token;

        if (token = await AsyncStorage.getItem('token')) {
            setExpoPushToken(token)
        } else {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }

            token = (await Notifications.getExpoPushTokenAsync({ projectId: '3b181d93-d54c-45b2-9cae-a6968559e691' })).data;
            setExpoPushToken(token)

            await AsyncStorage.setItem('token', token);
        }

        return token;
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <Button title="Click here to copy to Clipboard" onPress={copyToClipboard} />
            <Button
                title="Logout"
                onPress={async () => {
                    await AsyncStorage.removeItem('token')
                    router.replace('/login')
                }}
            />
        </View>
    )
}