import './App.scss';
import BecomeHost from './pages/BecomeHost/BecomeHost';
import Home from './pages/Home/Home';
import SignupLogin from './pages/SignupLogin/SignupLogin';
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' exact element= {<Home/>} />
          <Route path='/signup_login' element= {<SignupLogin/>} />
          <Route path='/become-a-host' element= {<BecomeHost/>}>
            <Route path='structure' element= {<BecomeHost/>}/>
            <Route path='privacy-type'element= {<BecomeHost />}/>
            <Route path='location' element={<BecomeHost/>} />
            <Route path='floor-plan' element={<BecomeHost/>} />
            <Route path='photos' element={<BecomeHost/>} />
            <Route path='prices' element={<BecomeHost/>} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
