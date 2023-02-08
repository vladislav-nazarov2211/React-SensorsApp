import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux-toolkit/store/store'
import styles from './AddSensor.module.css'
import { useForm } from 'react-hook-form'
import { addSensor } from '../../redux-toolkit/slices/sensorsSlice'


export const AddSensor = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {register, formState: {errors}, handleSubmit} = useForm({mode: 'onBlur'})      // hook-form для валидации полей
    
    const [inputs, setInputs] = useState({                   // state для всех инпутов
        sensor_id: '',
        name: '',
        temperature: '',
        humidity: ''
    })

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))        // Функция для записи в state сразу всех инпутов
    }

    function onSubmit(e: any) {
        dispatch(addSensor(inputs))          // Диспатчем добавление нового датчика
        setInputs({                          // Обнуляем по клику инпуты 
            sensor_id: '',
            name: '',
            temperature: '',
            humidity: ''
        })
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.title}>
                    <div className='sensor__title'>
                        <input
                            {...register('sensor_id', {required: 'Поле обязательно для ввода!', pattern: {value: /^[0-9]/, message: 'Поле должно иметь только числовое положительное значение!'}, maxLength: {value: 5, message: 'Не более 5-ти символов!'}})} 
                            onChange={changeHandler}
                            value={inputs.sensor_id} 
                            placeholder='ID:' 
                            name="sensor_id"
                        />
                        {errors?.sensor_id && <div className={styles.idError}>{errors.sensor_id.message?.toString()}</div>}
                    </div>

                    <div className='description'>
                        <input 
                            {...register('name', {required: 'Поле обязательно для ввода!', maxLength: {value: 15, message: 'Не более 15-ти символов!'}})} 
                            onChange={changeHandler} 
                            value={inputs.name} 
                            placeholder='Название датчика:' 
                            name="name"
                        />
                        {errors?.name && <div className={styles.nameError}>{errors.name.message?.toString()}</div>}
                    </div>
                    
                    <div className='description'>
                        <input 
                            {...register('temperature', {required: 'Поле обязательно для ввода!', pattern: {value: /^[-0-9]/, message: 'Поле должно иметь только числовое значение!'}, maxLength: {value: 3, message: 'Не более 3-ёх символов!'}})} 
                            onChange={changeHandler} 
                            value={inputs.temperature} 
                            placeholder='Температура:' 
                            name="temperature"
                        />
                        {errors?.temperature && <div className={styles.temperatureError}>{errors.temperature.message?.toString()}</div>}
                    </div>

                    <div className='description'>
                        <input 
                            {...register('humidity', {required: 'Поле обязательно для ввода!', pattern: {value: /^[0-9]/, message: 'Поле должно иметь только числовое положительное значение!'}, maxLength: {value: 3, message: 'Не более 3-ти символов!'}})} 
                            onChange={changeHandler} 
                            value={inputs.humidity} 
                            placeholder='Влажность:' 
                            name="humidity"
                        />
                        {errors?.humidity && <div className={styles.humidityError}>{errors.humidity.message?.toString()}</div>}
                    </div>
                </div>
                <button type='submit' className='btn'>Добавить датчик</button>
            </form>
        </div>
    )
}



