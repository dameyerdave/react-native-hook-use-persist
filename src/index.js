import { useState, useEffect } from 'react'
import { DeviceEventEmitter } from 'react-native'
import SyncStorage from 'sync-storage';

const initPersist = async () => {
    try {
        return await SyncStorage.init();
    }
    catch (err) {
        console.log(err)
    }
}

const usePersist = (_key, _default) => {
    const KEY = '@_@' + _key
    const [obj, setObj] = useState(_default)

    const set = (newObj) => {
        try {
            newObj = typeof newObj === 'function' ? newObj(obj) : newObj
            console.log('set', newObj)
            setObj(newObj)
            SyncStorage.set(KEY, JSON.stringify(newObj));
            DeviceEventEmitter.emit(KEY, newObj)
        }
        catch (err) {
            console.err(err)
        }
    }

    useEffect(() => {
        const value = JSON.parse(SyncStorage.get(KEY))
        console.log('value', value)
        if (value) {
            setObj(value)
        } else {
            set(_default)
        }

        const subscription = DeviceEventEmitter.addListener(KEY, (newObj) => { setObj(newObj) })
        return () => {
            subscription.remove()
        }
    }, [])

    return [obj, set]
}

export { usePersist, initPersist }