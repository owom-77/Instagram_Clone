import { useEffect, useState } from 'react';
import './App.css';
import accountSer from './appwrite/accountservice'
import { useDispatch } from 'react-redux';
import {Login,Logout} from './store/authSlice'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom';

function App() {

  let dispatch = useDispatch()
  let [loading,setLoading] = useState(true);

  useEffect(()=>{
    accountSer.getCurrentAccount()
    .then((account)=>{
      if(account){
        dispatch(Login(account))
      }
    })
    .finally (()=>setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App;
