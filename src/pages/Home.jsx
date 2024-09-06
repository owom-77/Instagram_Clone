import React, { useEffect, useState } from 'react'
import postDatabase from '../appwrite/postdatabase'
import { PostCard, Container } from '../component/index1'
import { useSelector } from 'react-redux'

export default function Home() {

    let userStatus = useSelector((state)=>state.status)

    const [posts, setPosts] = useState([])

    useEffect(() => {
        postDatabase.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0 || userStatus === false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
