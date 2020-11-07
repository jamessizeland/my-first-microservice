import React, {useState} from 'react';
import axios from 'axios';
const postServicePort = 4000;


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [title, setTitle] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault(); //stop the form from doing its default submit behaviour
        
        await axios.post(`http://localhost:${postServicePort}/posts`, {
            title
        });
        setTitle(''); //empty the input box after successful submit
    };

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="form-control"
                /> 
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
};