import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { courseService } from '@/_services/admin/course.service';

const CourseEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [course, setCourse] = useState([]);
    const flag = useRef(false);

    const onChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        courseService.updateCourse(course)
            .then(res => {
                navigate('../')
            })
            .catch(err => console.log(err))
    }
    useEffect(()=>{
        if (flag.current === false) {
            courseService.getCourse(id)
                .then(res => {
                    setCourse(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='CourseEdit'>
            édition d'un Régime :
            <form className="formedit" onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={course.name} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" defaultValue={course.description} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default CourseEdit;