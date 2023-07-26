import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/Home'
import AddData from "./component/AddData"
import './App.css';
import GetUserData from './component/GetUserData';


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
       
       <Route path="/" element={<Home/>}/>
       <Route path="/home" element={<AddData/>}/>
       <Route path="/getUser" element={<GetUserData/>}/>

      </Routes>
      
      </BrowserRouter>

    </>
  );
}

export default App;
