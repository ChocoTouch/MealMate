import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService } from '@/_services/admin/course.service';

const CourseAdd = () => {

    let navigate = useNavigate();

    const [course, setCourse] = useState([]);

    const onChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(course);
        courseService.addCourse(course)
            .then(res => navigate('../'))
            .catch(err => console.log(err))
    }

    return (
        <div className='CourseAdd'>
            <form className='formadd' onSubmit={onSubmit}>
                <div className="group">
                    <h1>Ajout d'un Plat :</h1>
                </div>  
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" onChange={onChange} autoComplete="off" required/>
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" onChange={onChange} autoComplete="off" />
                </div>
                <div className="group">
                    <button>Ajouter</button>
                </div>
            </form>
        </div>
    );
};

export default CourseAdd;