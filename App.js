import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { initPersist } from './src/index'
import Test from './Test'

export default function App () {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false)

    useEffect(() => {
        const init = async () => {
            try {
                await initPersist()
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoadingComplete(true)
            }
        }
        init()
    }, [])

    if (!isLoadingComplete) {
        return null;
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Test />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
