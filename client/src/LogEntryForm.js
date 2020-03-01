import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {createLogEntries} from './API';
const LogEntryForm = ({ location, onClose }) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        try {
            setLoading(false)
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntries(data);
            console.log(created);
            onClose();
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false)
        }
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        {error ? <h3>{error}</h3> : null}
        <label htmlFor="title">Title</label>
        <input name="title" required ref={register}/>
        <label htmlFor="comments">comments</label>
        <textarea name="comments" ref={register}/>        
        <label htmlFor="description">description</label>
        <textarea name="description" ref={register}/>   
        <label htmlFor="image">image</label>
        <input name="image" ref={register}/>  
        <label htmlFor="visitAtDate">Visit Date</label>
        <input name="visitAtDate" type="date" required ref={register}/>    
        <button disabled={loading}>{loading ? 'Loading...': 'Create log entry'}</button>       
      </form>
    );
};

export default LogEntryForm;