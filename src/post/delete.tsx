import React, {useContext, useState} from 'react'
import {API, graphqlOperation} from "aws-amplify";
import {deletePost} from "../graphql/mutations";
import {AppContext} from "../App";

const DeletePost = (post: any) => {

    const [deleting, setDeleting] = useState(false)
    const {dispatch} = useContext(AppContext)

    const handleDelete = async () => {
        setDeleting(true)
        removePost().then((r: any) => null)
        setDeleting(false)
    }

    async function removePost() {
        try {
            const {data}: any = await API.graphql(graphqlOperation(deletePost, {input: {id: post.id}}))
            dispatch({
                type: 'REMOVE',
                post: data.deletePost
            })
        } catch (err) {
            console.log('error deleting posting...', JSON.stringify(err))
        }
    }


    return (
        <button onClick={() => handleDelete().then(() => null)}>
            {deleting ? 'Deleting...' : 'Delete Post'}
        </button>
    )
}


export default DeletePost;
