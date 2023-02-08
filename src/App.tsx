import { AddSensor } from './components/AddSensor/AddSensor';
import { Header } from './components/Header/Header';
import { SensorList } from './components/SensorsList/SensorList';


function App() {
	return (
		<div>
			<Header />
			<AddSensor />
			<SensorList />
		</div>
	);
}

export default App;
