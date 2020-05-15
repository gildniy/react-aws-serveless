import React, {useContext, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {updatePost} from "../graphql/mutations";
import {AppContext} from "../App";

const EditPost = (item: any) => {
    const [post, setPost] = useState({
        show: false,
        postData: {
            title: item.title,
            body: item.body
        }
    });

    const {dispatch} = useContext(AppContext)

    const handleModal = () => {
        setPost({...post, show: !post.show});
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        editPost().then((r: any) => null)
        handleModal()
    };

    const handleChange = (e: any) => {
        setPost({
            ...post,
            postData: {
                ...post.postData,
                [e.target.name]: e.target.value
            }
        });
    };

    async function editPost() {
        try {
            const {data}: any = await API.graphql(graphqlOperation(updatePost, {
                input: {
                    id: item.id,
                    title: post.postData.title,
                    body: post.postData.body
                }
            }))
            dispatch({
                type: 'EDIT',
                post: data.updatePost
            })
        } catch (err) {
            console.log('error updating posting...', JSON.stringify(err))
        }
    }

    return (
        <>
            {post.show ? (
                <div className="modal">
                    <button className="close" onClick={handleModal}>
                        X
                    </button>
                    <form
                        className="add-post"
                        onSubmit={(event: any) => handleSubmit(event).then(() => null)}
                    >
                        <input
                            type="text"
                            required
                            value={post.postData.title}
                            name='title'
                            onChange={handleChange}
                        />
                        <br/>
                        <textarea
                            required
                            value={post.postData.body}
                            name='body'
                            onChange={handleChange}
                        />
                        <br/>
                        <button>Update Post</button>
                    </form>
                </div>
            ): <button onClick={handleModal}>Edit</button>}

        </>
    )
}

export default EditPost;
