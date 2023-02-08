import { useDispatch } from 'react-redux'
import { fetchSensor } from '../../redux-toolkit/actions/actions'
import { AppDispatch } from '../../redux-toolkit/store/store'
import styles from './Header.module.css'

export const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    
    function addList() {
        dispatch(fetchSensor())  // По клику диспатчем thunkcreator
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.header__title}>Приложение для работы с датчиками:</h1>
            <button onClick={addList} className='btn'>Загрузить список по умолчанию</button>
        </header>
    )
}

