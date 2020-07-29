import { useState, useEffect } from 'react'
import { AsyncStorage, DeviceEventEmitter } from 'react-native'

export default function usePersist(_key, _default) {
    const KEY = '@_@' + _key
    const [obj, setObj] = useState(_default)

    const load = async () => {
        try {
            const _obj = await AsyncStorage.getItem(KEY)
            if (_obj) {
                setObj(JSON.parse(_obj))
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const set = async (newObj) => {
        newObj = typeof newObj === 'function' ? newObj(obj): newObj
        try {
            setObj(newObj)
            DeviceEventEmitter.emit(KEY, newObj)
            await AsyncStorage.setItem(KEY, JSON.stringify(newObj))
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        load()
        const subscription = DeviceEventEmitter.addListener(KEY, (newObj) => { setObj(newObj) })
        return () => {
            subscription.remove()
        }
    }, [])

    return [obj, set]
}