import Axios from 'axios';
import React, { createRef } from 'react';
import { useHistory } from 'react-router-dom';

const Upload = () => {
    const history = useHistory()

const ref = createRef('')

const handleSubmit = async (e ) => {
    e.preventDefault()
    try {
        const data = new FormData()
        console.log('axios');
         data.append 
            ('file',  ref.current.files[0] )

        console.log(data.file);
    const res = await Axios.post('http://localhost:5000/upload', data)
    console.log('res' + res);
    console.log('after'+data.file);
        console.log('after axios');
        history.push('/')
    } catch (error) {
        console.log('catch' +error.message);        
    }
}
    return (
        <div>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                
                <div className='border rounded'>
                    <div className="form-group">
                    

                    <input type="file" name="file" id="file" ref={ref}/>
                    <label htmlFor="file"></label>
                    <input type="submit" className='btn btn-primary' value="Submit "/>
                </div>
                </div>
            </form>
        </div>
    );
};

export default Upload;