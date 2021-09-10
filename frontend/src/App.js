import './App.css';
import Footer from './component/Footer/Footer';
import Header from './component/Header/Header';
import CreateNote from './screens/CreateNote/CreateNote';
import LandingPage from './screens/LandingPages/LandingPage';
import {BrowserRouter, Route} from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import SingleNote from './screens/SingleNote/SingleNote';
import {useState} from "react"



function App() {

  const [search, setSearch] = useState("")

  return (
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <main>
      <Route path='/' component={LandingPage} exact />
      <Route path='/login' component={LoginScreen} exact />
      <Route path='/register' component={RegisterScreen} exact />
      <Route path='/createnote' component={CreateNote} exact />      
      <Route path='/note/:id' component={SingleNote} exact />
      <Route path='/mynotes' component={() =><MyNotes search={search}/>} />
      </main>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
