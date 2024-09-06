import React, { useState, useEffect } from 'react'
import postDatabase from '../appwrite/postdatabase'
import { Link, useNavigate, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import imageStorage from '../appwrite/imagedatabase'
import { Button, Container } from '../component/index1'


export default function Post() {

    let userData = useSelector((state) => state.userData)
    let [post, setPost] = useState(null)
    let { slug } = useParams()
    let navigate = useNavigate()

    let isAuthor = post && userData ? post.userId === userData.$id : null

    useEffect(() => {
        if (slug) {
            postDatabase.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post)
                    }else{
                        navigate('/')
                    }
                })
        } else {
            navigate('/')
        }
    }, [slug, navigate])


    let handleDelete = async () => {
        await postDatabase.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    imageStorage.deleteFile(post.postImage)
                }
                navigate('/')
            })
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={imageStorage.getFilePreview(post.postImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
