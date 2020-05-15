import React, {useContext, useState} from "react";
import {API, graphqlOperation} from 'aws-amplify';
import {AppContext} from "../App";
import {createPost} from "../graphql/mutations";

const CreatePost = () => {
    const initialState = {
        title: '',
        body: '',
        creating: false,
        errorMsg: ''
    }
    const [post, setPost] = useState(initialState)
    const {dispatch} = useContext(AppContext)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setPost({...post, creating: true})
        const {title, body} = post
        newPost({title, body, createdAt: new Date().toISOString()}).then(r => null)
        setPost(initialState)
    };

    async function newPost(post: any) {
        try {
            const {data}: any = await API.graphql(graphqlOperation(createPost, {input: post}))
            dispatch({
                type: 'ADD',
                post: data.createPost
            })
        } catch (err) {
            console.log('error creating posting...', JSON.stringify(err))
        }
    }

    return (
        <div>
            <h1>New Post</h1>
            <div>
                <form
                    className="add-post"
                    onSubmit={(event: any) => handleSubmit(event).then(() => null)}
                >
                    <input
                        type="text" placeholder="Title"
                        required
                        name='title'
                        value={post.title}
                        onChange={
                            event => setPost({
                                ...post,
                                title: event.target.value
                            })}
                    />
                    <br/>
                    <textarea
                        placeholder="Body"
                        required
                        name='body'
                        value={post.body}
                        onChange={
                            event => setPost({
                                ...post,
                                body: event.target.value
                            })}
                    />
                    <br/>
                    <button>{post.creating ? "Posting..." : "Create Post"}</button>
                </form>
                {post.errorMsg && <p>{post.errorMsg}</p>}
            </div>
        </div>
    );
}

export default CreatePost;
