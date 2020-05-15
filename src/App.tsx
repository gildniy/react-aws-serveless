import React, {useReducer,} from 'react';
import './App.css';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import CreatePost from "./post/createPost";
import DisplayPosts from "./post/displayPosts";

Amplify.configure(aws_exports);

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'LIST':
            return {...state, posts: action.posts}
        case'ADD':
            return {...state, posts: [...state.posts, action.post]}
        case 'EDIT':
            return {
                ...state,
                posts: state.posts.map(
                    (post: any) => post.id === action.post.id
                        ? action.post
                        : post)
            }
        case 'REMOVE':
            return {
                ...state,
                posts: state.posts.filter((post: any) => post.id !== action.post.id)
            }
        default:
            return state
    }
}

// @ts-ignore
export const AppContext = React.createContext()
const AppProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(reducer, {posts: []});
    return <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
}

function App() {
    return (
        <div className="App">
            <div className="container">
                <AppProvider>
                    <CreatePost/>
                    <DisplayPosts/>
                </AppProvider>
            </div>
        </div>
    );
}

export default App;
