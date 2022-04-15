import './App.css';
import Header from './component/common/Header';
import System from './component/list/System';
import RightMenu from './component/rightTab/rightMenu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
        <div className="bodyContainer">
          <Router>
          <RightMenu/>
            <Routes>
              <Route exact path="/system" element={<System/>} />
            </Routes>
          </Router>
        </div>
    </div>
  );
}

export default App;
