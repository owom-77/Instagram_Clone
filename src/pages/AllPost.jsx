import React, { useEffect, useState } from 'react'
import postDatabase from '../appwrite/postdatabase'
import { PostCard, Container } from '../component/index1'

export default function AllPost() {

    useEffect(() => {}, [])

    let [posts, setPosts] = useState([])

    postDatabase.getPosts()
        .then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })

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
