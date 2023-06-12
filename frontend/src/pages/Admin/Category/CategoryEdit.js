import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryService } from '@/_services/admin/category.service';

const CategoryEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [category, setCategory] = useState([]);
    const flag = useRef(false);

    const onChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        categoryService.updateCategory(category)
            .then(res => {
                navigate('../')
            })
            .catch(err => console.log(err))
    }
    useEffect(()=>{
        if (flag.current === false) {
            categoryService.getCategory(id)
                .then(res => {
                    setCategory(res.data.data);
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='CategoryEdit'>
            édition d'une Catégorie :
            <form onSubmit={onSubmit}>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={category.name} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default CategoryEdit;