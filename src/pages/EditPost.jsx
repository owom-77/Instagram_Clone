import React,{useState,useEffect} from 'react'
import {PostForm,Container} from '../component/index1'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import postDatabase from '../appwrite/postdatabase'

export default function EditPost() {

    let navigate = useNavigate()
    let {slug} = useParams()
    let [post,setPost] = useState(null)

    useEffect(()=>{
        if(slug){
            postDatabase.getPost(slug)
            .then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post = {post}/>
        </Container>
    </div>
  ):null
}
