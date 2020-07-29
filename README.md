# react-native-hook-use-persist

react-native-hook-use-persist is a hook you can use to add a persistent state. The usage is like `useState` but the value is kept in `AsyncStorage`.

## Content
- [react-native-hook-use-persist](#react-native-hook-use-persist)
  - [Content](#content)
  - [`Installation`](#installation)
  - [`Usage`](#usage)

## `Installation`

```bash
npm install react-native-hook-use-persist
```

## `Usage`

```js
import usePersist from 'react-native-hook-use-persist'

const [list, setList] = usePersist('list', [])

const newList = [...list]

// manipulate the list

setActivityList(newList)
```