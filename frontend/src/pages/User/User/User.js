import React from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {
    let navigate = useNavigate();

    const marcel = (userId) =>{
        console.log("marcel")
        navigate("../edit/"+ userId)
    }
    return (
        <div className='User'>
            USER LIST
            <button onClick={()=>marcel(4)}> User 4</button>
        </div>
    );
};

export default User;