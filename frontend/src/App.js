import Demo from './components/Demo'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import video from './assets/video.mp4'
import './App.css'

function App() {
    return (
        <div className="App">
                <Demo />
        </div>
    );
}

export default App;
