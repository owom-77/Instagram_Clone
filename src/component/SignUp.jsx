import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import accountSer from '../appwrite/accountservice'
import {Input,Button,Logo} from './index1'
import { Link } from 'react-router-dom'

export default function SignUp() {

    let { register, handleSubmit } = useForm()
    let dispatch = useDispatch()
    let [error, setError] = useState('');
    let navigate = useNavigate();

    let create = async (data) => {
        setError('')
        try {
            let session = accountSer.SignUpAccount(data)
            if (session) {
                await accountSer.getCurrentAccount()
                    .then((userData) => {
                        if (userData) {
                            dispatch(Login(userData))
                        }
                        navigate('/')
                    })
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>

                        <Input
                        label = 'Name'
                        className = ''
                        type = 'text'
                        placeholder = 'Enter your name'
                        {...register('name',{required : true})}
                        />

                        <Input
                        label = 'Email'
                        className = ''
                        type = 'email'
                        placeholder = 'Enter your email'
                        {...register('email',{
                            required : true,
                            validate : {
                                matchPatern: (value) => /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(value) || "Email address must be a valid address",
                            }
                        })}
                        />

                        <Input
                        label = 'Password'
                        type = 'password'
                        placeholder = 'Enter your password'
                        {...register('password',{required : true})}
                        />

                        <Button
                        className = 'w-full'
                        type = 'submit'
                        >
                            Sign Up
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}
