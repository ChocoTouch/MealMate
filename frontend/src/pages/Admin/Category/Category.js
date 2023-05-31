import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '@/_services/admin/category.service';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const flag = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            categoryService.getAllCategories()
                .then(res => {
                    setCategories(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const delCategory = (categoryId) => {
        categoryService.deleteCategory(categoryId)
            .then(res =>{
                setCategories((current) => current.filter(category => category.id !== categoryId))
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='Category'>
            liste des categories
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
                        categories.map(category => (
                            <tr key={category.id}>
                                <td><Link to={`../edit/${category.id}` }>{category.id}</Link></td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>{category.createdAt}</td>
                                <td>{category.updatedAt}</td>
                                <td>{category.deletedAt}</td>
                                <td><span className='del_ubtn' onClick={() => delCategory(category.id)}>Supprimer</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Category;