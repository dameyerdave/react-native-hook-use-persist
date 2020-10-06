# react-native-hook-use-persist

react-native-hook-use-persist is a hook you can use to add a persistent state. The usage is like `useState` but the value is kept in `AsyncStorage`.

## Content

- [react-native-hook-use-persist](#react-native-hook-use-persist)
  - [Content](#content)
  - [`Installation`](#installation)
  - [`Usage`](#usage)
    - [Initialize the persistent values in your `App.js`](#initialize-the-persistent-values-in-your-appjs)
    - [Use the hook inside other views](#use-the-hook-inside-other-views)

## `Installation`

```bash
npm install react-native-hook-use-persist
```

## `Usage`

### Initialize the persistent values in your `App.js`

```js
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { initPersist } from 'react-native-hook-use-persist'

import Test from './Test'

export default function App () {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false)

    useEffect(() => {
        const init = async () => {
            try {
                # Asynchronous load from database
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

```

### Use the hook inside other views

```js
import React from "react"
import { View, Text, Button } from "react-native"
import { usePersist } from "./src/index"

export default function Test() {
  const [getBla, setBla] = usePersist("key", 0)

  return (
    <View>
      <Text>{getBla()}</Text>
      <Button
        onPress={() => {
          setBla((bla) => bla + 1)
        }}
        title="Pressme"
      />
    </View>
  )
}
```
