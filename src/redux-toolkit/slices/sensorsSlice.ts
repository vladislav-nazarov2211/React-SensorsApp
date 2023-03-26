import { createSlice } from '@reduxjs/toolkit'
import { initialFilterStateType, sensor } from '../../types/types'


let sensors = (sessionStorage.getItem("sensors")) 

const initialState: initialFilterStateType = {
    sensorsArray: (sensors === null ? [] : JSON.parse(sessionStorage.getItem("sensors") || '')), // Проверка на наличие данных в sessionStorage
    isFetching: false                                                                            // Установка значения на прелоадер
}
ы
const sensorsSlice = createSlice({
    name: 'sensorsSlice',
    initialState,
    reducers: {
        setSensors (state, action) {
            let newArr: Array<sensor> = []
            action.payload.forEach((item: sensor) => {
                let id = newArr.length >= 1 ? newArr[newArr.length - 1].id + 1 : 1               // Формируем уникальный id, даже в случае удаления записи и последующего добавления, id не пересекутся
                newArr.push({...item, id})
            })
            state.sensorsArray = newArr
            sessionStorage.setItem("sensors", JSON.stringify([...state.sensorsArray]))          // Сохраняем готовый массив в sessionStorage
        },
        fetching(state, action) {
            state.isFetching = action.payload                                                   // Меняем значение прелоадера (действие из action)
        },
        addSensor(state, action) {
            let id = state.sensorsArray.length >= 1 ? state.sensorsArray[state.sensorsArray.length - 1].id + 1 : 1     // Проверяем наличие элементов в массиве, также формируем уникальный id
            let newSensor: sensor = {                                                                                  // Создаем объект для добавления, парсим строчные значения в числовые по просьбе TS 
                id: id,
                sensor_id: parseInt(action.payload.sensor_id),
                name: action.payload.name,
                temperature: parseInt(action.payload.temperature),
                humidity: parseInt(action.payload.humidity)
            }
            state.sensorsArray = state.sensorsArray.concat(newSensor)                                                  // Добавляем новый объевт в массив 
            sessionStorage.setItem("sensors", JSON.stringify([...state.sensorsArray]))                                 // Сохраняем готовый массив в sessionStorage
        },
        deleteSensor(state, action) {
            state.sensorsArray = state.sensorsArray.filter((item) => {                                                 // Фильтруем по полученному из UI id с наличием его в массиве и удаляем
                return item.id != action.payload
            })
            sessionStorage.setItem("sensors", JSON.stringify([...state.sensorsArray]))                                 // Сохраняем готовый массив в sessionStorage
        },
        changeData(state) {
            state.sensorsArray = state.sensorsArray.map((item: sensor) => {
                let randomTemperature = Math.floor(Math.random() * (100 + 50 + 1)) - 50
                let randomHumidity = Math.floor(Math.random() * 100) + 1
                return {
                    ...item, 
                    temperature: randomTemperature,
                    humidity: randomHumidity
                }
            })
            sessionStorage.setItem("sensors", JSON.stringify([...state.sensorsArray]))                                 // Сохраняем готовый массив в sessionStorage
        }
    }     
})

export const { setSensors, fetching, addSensor, deleteSensor, changeData } = sensorsSlice.actions
export default sensorsSlice.reducer

      
