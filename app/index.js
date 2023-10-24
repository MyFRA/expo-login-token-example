import { Redirect } from 'expo-router';

export default function page() {
    return <Redirect href={'/login'} />
}