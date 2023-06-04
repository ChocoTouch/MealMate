import React from 'react';
import { accountService } from '@/_services';

const Profile = () => {
    let userProfile = accountService.getPayload()
    return (
        <div className='Profile'>
            Profil de {userProfile.username}
            <p>email : {userProfile.email}</p>
            <p>firstname : {userProfile.firstname}</p>
            <p>name : {userProfile.name}</p>
            <p>username : {userProfile.username}</p>
            <p>roles : {userProfile.roles}</p>
            <p>telephone : {userProfile.telephone || "aucun numéro de téléphone"}</p>


        </div>
    );
};

export default Profile;