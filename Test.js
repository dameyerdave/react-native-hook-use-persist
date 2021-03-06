import React from 'react'
import { View, Text, Button } from 'react-native'
import { usePersist } from './src/index'

export default function Test () {
    const [getBla, setBla] = usePersist('key', 0)

    return (
        <View>
            <Text>{getBla()}</Text>
            <Button onPress={() => {
                setBla(bla => bla + 1)
            }} title="Pressme" />
        </View>
    )
}

