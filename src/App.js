import './App.css';
import { Navbar } from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import { AddProduct} from './component/AddProduct/AddProduct';
import { AuthProvider } from './context';


function App() {
  
  return (
    <AuthProvider>
    <Router>
      <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/AddProduct' element={<AddProduct />} />
    </Routes>
  </Router>
  </AuthProvider>
  );
}

export default App;
