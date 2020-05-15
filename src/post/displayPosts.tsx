import React, {useContext, useEffect} from 'react'
import {API, graphqlOperation} from "aws-amplify";
// @ts-ignore
import {listPosts} from "../graphql/queries";
import {AppContext} from "../App";
import EditPost from "./editPost";
import DeletePost from "./delete";

const DisplayPosts = () => {

    const {state: {posts}, dispatch} = useContext(AppContext)

    async function getData() {
        try {
            const postsData: any = await API.graphql(graphqlOperation(listPosts))
            dispatch({
                type: 'LIST',
                posts: postsData.data.listPosts.items
            })
        } catch (err) {
            console.log('error fetching data..', err)
        }
    }

    useEffect(() => {
        getData().then(r => null)
    }, [])


    return (
        <div className="posts">
            {
                posts.map((post: any, idx: number) => <div key={idx}>
                    <hr/>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    <time dateTime={post.createdAt}>
                        {new Date(post.createdAt).toLocaleString()}</time>
                    <br/>
                    <EditPost {...post} />
                    <DeletePost {...post} />
                </div>)
            }
        </div>
    )
}


export default DisplayPosts;
