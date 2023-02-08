export interface initialFilterStateType {
    sensorsArray: Array<sensor>
    isFetching: boolean
}

export interface sensor {
    id: number
    sensor_id: number
    name: string
    temperature: number
    humidity: number
}