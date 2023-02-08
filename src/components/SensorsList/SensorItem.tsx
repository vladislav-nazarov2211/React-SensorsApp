import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeData, deleteSensor } from '../../redux-toolkit/slices/sensorsSlice'
import { AppDispatch, RootState } from '../../redux-toolkit/store/store'
import { sensor } from '../../types/types'
import styles from './SensorList.module.css'

type PropsType = {
    item: sensor
    sensorsArray: Array<sensor>
}

export const SensorItem: React.FC<PropsType> = ({item, sensorsArray}) => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {                                 //  Имитация изменения температуры и влажности каждые 5 секунд
        let timerId = setTimeout(() => {
            dispatch(changeData())                     
        }, 5000)
        return () => {
            clearTimeout(timerId)                  
        }
    }, [sensorsArray])             // Зависимость от изменений в массиве датчиков
    
    function deleteItem() {
        dispatch(deleteSensor(item.id))                        // Диспатчем удаление датчика
    }

    return (            
        <div className={styles.sensorItem}>
            <div><span>ID: </span>{item.sensor_id}</div>
            <div><span>Название датчика: </span>{item.name}</div>
            <div><span>Температура: </span>{item.temperature ? item.temperature : 'Нет данных'}</div>
            <div><span>Влажность: </span>{item.humidity ? item.humidity : 'Нет данных'}</div>
            
            <div>
                <button onClick={deleteItem} className='btn'>Удалить датчик</button>
            </div>
        </div>
    )
}
