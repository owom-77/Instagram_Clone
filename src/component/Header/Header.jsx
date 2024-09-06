import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Container,Logo,LogoutButton} from '../index1'

export default function Header() {

  let authStatus = useSelector((state)=>state.status)
  let navigate = useNavigate()
  

  let navItems = [
    {
      name : 'Home',
      slug : '/',
      active : true,
    },

    {
      name : 'Login',
      slug : '/login',
      active : !authStatus,
    },

    {
      name : 'Sign Up',
      slug : '/signup',
      active : !authStatus
    },

    {
      name : 'All Post',
      slug : '/all-post',
      active : authStatus
    },

    {
      name : 'Add Post',
      slug : '/add-post',
      active : authStatus
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((val)=>(
              val.active ? 
              (
                <li key={val.name}>
                  <button
                  onClick={()=> navigate(val.slug)}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {val.name}
                  </button>
                </li>
              )
              :
              null
            ))}
            {
              authStatus && 
              <li>
                <LogoutButton/>
              </li>
            }
          </ul>
        </nav>
        </Container>
    </header>
  )
}
