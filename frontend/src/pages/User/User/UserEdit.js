import React from 'react';
import { useParams } from 'react-router-dom';

const UserEdit = () => {
    let {uid} = useParams();
    return (
        <div className='UserEdit'>
            USER EDIT
        </div>
    );
};

export default UserEdit;