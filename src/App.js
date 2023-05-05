import './App.scss';
import Home from './pages/Home/Home';
import SignupLogin from './pages/SignupLogin/SignupLogin';
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/signup_login' element= {<SignupLogin/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
