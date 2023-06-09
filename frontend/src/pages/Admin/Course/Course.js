import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '@/_services/admin/course.service';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const flag = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            courseService.getAllCourses()
                .then(res => {
                    setCourses(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const delCourse = (courseId) => {
        courseService.deleteCourse(courseId)
            .then(res =>{
                setCourses((current) => current.filter(course => course.id !== courseId))
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='list_table'>
            liste des courses
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Date de création</th>
                        <th>Date d'édition</th>
                        <th>Date de suppression</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courses.map(course => (
                            <tr key={course.id}>
                                <td><Link to={`../edit/${course.id}` }>{course.id}</Link></td>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>{course.createdAt}</td>
                                <td>{course.updatedAt}</td>
                                <td>{course.deletedAt}</td>
                                <td><span className='del_ubtn' onClick={() => delCourse(course.id)}>Supprimer</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Course;