import { render, screen } from '@testing-library/react';
import { Recipe as AdminRecipe} from '@/pages/Admin/Recipe';
import { Recipes } from '@/pages/Public/Recipe';
import { MyRecipes } from '@/pages/User/MyRecipes';


describe('Admin', () =>{
    test('renders correctly', () => {
        render(<AdminRecipe />);
        const linkElement = screen.getByText(/recettes/i);
        expect(linkElement).toBeInTheDocument();
      });
})

describe('Public', () =>{
    test('renders correctly', () => {
        render(<Recipes />);
        const linkElement = screen.getByText(/nom/i);
        expect(linkElement).toBeInTheDocument();
      });
})

describe('User', () =>{
    test('renders correctly', () => {
        render(<MyRecipes />);
        const linkElement = screen.getByText(/nom/i);
        expect(linkElement).toBeInTheDocument();
      });
})
