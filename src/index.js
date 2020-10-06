import { useState, useEffect, useRef } from 'react'
import { DeviceEventEmitter } from 'react-native'
import SyncStorage from 'sync-storage';

const initPersist = async () => {
    try {
        return await SyncStorage.init();
    }
    catch (err) {
        console.error(err)
    }
}

const usePersist = (_key, _default) => {
    const KEY = '@_@' + _key
    const [_, bump] = useState(0)

    const set = (newObj) => {
        // console.log('set', newObj, typeof newObj)
        try {
            newObj = typeof newObj === 'function' ? newObj(get()) : newObj
            SyncStorage.set(KEY, newObj)
            bump(current => current + 1)
            DeviceEventEmitter.emit(KEY, newObj)
        }
        catch (err) {
            console.error(err)
        }
    }

    const get = () => {
        return SyncStorage.get(KEY)
    }

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener(KEY, () => {
            bump(current => current + 1)
        })
        return () => {
            subscription.remove()
        }
    }, [])

    return [get, set]
}

export { usePersist, initPersist }