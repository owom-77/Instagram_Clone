import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import postDatabase from '../appwrite/postdatabase'
import imageStorage from '../appwrite/imagedatabase'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Input, Button, RTE, Select } from './index1'

export default function PostForm({ post }) {

    let { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.id || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })
    let navigate = useNavigate()
    let userData = useSelector((state) => state.userData)
    console.log(userData)

    let submit = async (data) => {
        console.log(data)
        if (post) {
            let file = data.image[0] ? await imageStorage.uploadFile(data.image[0]) : null

            if (file) {
                await imageStorage.deleteFile(post.postImage)

                let dbPost = await postDatabase.updatePost(post.$id, {
                    ...data,
                    postImage: file ? file.$id : undefined
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }

            } 
        }else {

            let file = data.image[0] ? await imageStorage.uploadFile(data.image[0]) : null

            if (file) {
                let fileId = file.$id
                data.postImage = fileId

                let dbPost = await postDatabase.createPost({
                    ...data,
                    userId: userData.$id
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    let slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') 
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
            
                return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">

                <Input
                    label='Title'
                    placeholder='Enter your title'
                    className=''
                    type='text'
                    {...register('title', { required: true })}
                />

                <Input
                    label='Slug'
                    type='text'
                    placeholder='slug'
                    className=''
                    {...register('slug', { required: true })}
                    onInput = {(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value),{shouldValidate:true})
                    }}
                />

                <RTE
                    label='Content'
                    name='content'
                    control={control}
                    defaultValue={getValues('content')}
                />

            </div>
            <div className="w-1/3 px-2">

                <Input
                    label='PostImage'
                    type='file'
                    {...register('image', { required: !post })}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={imageStorage.getFilePreview(post.postImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={['active', 'deactive']}
                    label='Status'
                    {...register('status', { required: true })}
                />

                <Button
                    type='submit'
                    bgColor={post ? 'green' : undefined}
                    className="w-full mt-5"
                >
                    {post ? 'update' : 'Create'}
                </Button>

            </div>
        </form>
    );
}
