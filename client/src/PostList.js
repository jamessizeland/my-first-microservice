import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
const postServicePort = 4000;

/*Make request over to post service, get a list of all the posts that have ever been created, iterate over that list of posts then create UI element to show titles of posts
*/
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get(`http://localhost:${postServicePort}/posts`);

        setPosts(res.data);
    };
        useEffect(() => {
            fetchPosts();
        }, []);
        // console.log(posts);
        const renderedPosts = Object.values(posts).map(post => {
            return (
                <div 
                    className="card" 
                    style={{width:'30%', marginBottom:'20px'}}
                    key={post.id}
                >
                    <div className="card-body">
                        <h3>{post.title}</h3>
                        <CommentCreate postId={post.id}/>
                    </div>
                </div>
            );
        });

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
        
}