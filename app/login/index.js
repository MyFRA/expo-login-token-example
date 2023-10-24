import { Button, Text, TextInput, View } from "react-native";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function page() {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkIsLoggedIn()
    }, [])

    const checkIsLoggedIn = async () => {
        if (await AsyncStorage.getItem('token')) {
            router.replace('/dashboard')
        } else {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <></>
    } else {
        return (
            <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: 'center' }}>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 8 }}>Username</Text>
                    <TextInput style={{ backgroundColor: 'white' }} value="exampleUsername" editable={false} />
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 8 }}>Password</Text>
                    <TextInput style={{ backgroundColor: 'white' }} value="examplePassword" secureTextEntry={true} editable={false} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button title="LOGIN" onPress={() => {
                        router.replace('/dashboard')
                    }} />
                </View>
            </View>
        )
    }
}