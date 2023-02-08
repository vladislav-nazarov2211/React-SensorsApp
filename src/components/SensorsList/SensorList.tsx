import { useSelector } from 'react-redux'
import { RootState } from '../../redux-toolkit/store/store'
import { sensor } from '../../types/types'
import styles from './SensorList.module.css'
import { SensorItem } from './SensorItem'
import { Preloader } from '../common/Preloader/Preloader'


export const SensorList = () => {
    const sensorsArray = useSelector((state: RootState) => state.sensors.sensorsArray)
    const isFetching = useSelector((state: RootState) => state.sensors.isFetching)

    return (
        <>
            {!isFetching ?                                                  // Покажем прелоадер, если датчики еще не загрузились 
                <div className={styles.sensorList}>
                    {sensorsArray.map((item: sensor) => {                   // Отрисовываем массив датчиков на страницу и разворачиваем его
                        return <SensorItem key={item.id} item={item} sensorsArray={sensorsArray}/>
                    }).reverse()}                                          
                </div>                                                     
            :
                <div className={styles.preloaderPosition}>
                    <Preloader />
                </div>    
            }
        </>
    )
}

