import axios from 'axios'
import { fetching, setSensors } from '../slices/sensorsSlice'
import { AppDispatch } from '../store/store'


export const fetchSensor = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(fetching(true))     // Отображаем прелоадер на странице
            const response = await axios.get('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0ee0b68e-6f7d-4ee5-ba64-e5652e15b5d1/events.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230207%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230207T130500Z&X-Amz-Expires=86400&X-Amz-Signature=5bf00099fbaffa034546097713a08116c02c7ba7bb70dbde7fd57d8236a049c1&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22events.json%22&x-id=GetObject')
            dispatch(setSensors(response.data))
            dispatch(fetching(false))    // Скрываем прелоадер на странице
        } catch (Error) {
            console.log('fetchSensor', Error)
        }
    }
}