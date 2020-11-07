import React, {useState, useEffect} from 'react';
import axios from 'axios';
const commentServicePort = 4001;

/*Reach out to comments microservice and read all comments associated with a certain post */

// eslint-disable-next-line import/no-anonymous-default-export
export default ( { postId } ) => {
    const [comments, setComments] = useState([]);
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:${commentServicePort}/posts/${postId}/comments`);
        setComments(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    });

    return <ul>{renderedComments}</ul>;
};