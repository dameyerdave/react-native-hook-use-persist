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
    const [obj, setObj] = useState((SyncStorage.get(KEY) || _default))

    const set = (newObj) => {
        try {
            newObj = typeof newObj === 'function' ? newObj(obj) : newObj
            setObj(newObj)
            SyncStorage.set(KEY, newObj);
            DeviceEventEmitter.emit(KEY, newObj)
        }
        catch (err) {
            console.err(err)
        }
    }

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener(KEY, (newObj) => { setObj(newObj) })
        return () => {
            subscription.remove()
        }
    }, [])

    return [obj, set]
}

export { usePersist, initPersist }