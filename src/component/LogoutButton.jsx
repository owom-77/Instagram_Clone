import React from 'react'
import { useDispatch } from 'react-redux'
import accountSer from '../appwrite/accountservice'
import { Logout } from '../store/authSlice'

export default function LogoutButton() {

    let dispatch = useDispatch()

    let handleLogout = () => {
        accountSer.LogoutAccount()
        .then(()=>{
            dispatch(Logout())
        })
    }
    
    return <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={handleLogout}
    >
    Logout
    </button>
}
