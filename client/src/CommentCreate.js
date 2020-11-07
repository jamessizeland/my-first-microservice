import React, {useState} from 'react';
import axios from 'axios';
const commentServicePort = 4001;

// eslint-disable-next-line import/no-anonymous-default-export
export default ( { postId } ) => {
    const [content, setContent] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:${commentServicePort}/posts/${postId}/comments`, {
            content
        });
        setContent(''); //empty box again after successful submit
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input 
                        value={content} 
                        onChange={e => setContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};