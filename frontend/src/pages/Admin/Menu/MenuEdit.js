import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { menuService } from '@/_services/admin/menu.service';

const MenuEdit = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const [menu, setMenu] = useState([]);
    // const [ingredients, setIngredients] = useState([]);
    // const [diets, setDiets] = useState([]);
    // const [theme, setTheme] = useState([]);
    const [tables, setTables] = useState({
        recipes : [],
        comments : [],
        user : []
    })

    const flag = useRef(false);

    const onChange = (e) => {
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(menu);
        menuService.updateMenu(menu)
            .then(res => {
                navigate('../')
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        if (flag.current === false) {
            menuService.getMenu(id)
                .then(res => {
                    setMenu(res.data.data);
                    // setIngredients(res.data.data.Ingredients);
                    // setDiets(res.data.data.Diets);
                    setTables({
                        recipes : res.data.data.Recipes,
                        comments : res.data.data.Comments,
                        user : res.data.data.User
                    })
                    console.log(res.data.data)
                    console.log(tables)
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='MenuEdit'>
            édition d'une recette :
            <form className="formedit" onSubmit={onSubmit}>
                <div className="group">
                    <p>Créateur : {menu.user_username}</p>
                </div>
                <div className="group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" id="name" defaultValue={menu.name} onChange={onChange} autoComplete="off"/>
                </div>
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" defaultValue={menu.description} onChange={onChange} autoComplete="off"/>
                </div>
                {/* <div className="group">
                    <label htmlFor="ingredients">Ingrédients</label>
                    <input type="text" name="ingredients" id="ingredients" value={recipe.ingredients} onChange={onChange} />
                </div> */}
                <div className="group">
                    Commentaires : {
                        tables.comments.map(comment => (
                            <p key={comment.id}>{comment.message}</p>
                        ))
                    }
                </div>
                <div className="group">
                    Recipes : {
                        tables.recipes.map(recipe => (
                            <div>
                                <p key={recipe.id}>{recipe.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="group">
                    <button>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default MenuEdit;