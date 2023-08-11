import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { PokemonDisplay } from './components/PokemonDisplay';
import { Home } from './pages/Home';

export const AppRouter = () => {
    const navigate = useNavigate();

    
    const handlePokemonSearch = (pokemon: string) => {
        navigate(`/pokemon/${pokemon}`);
        console.log(pokemon);
    };



    return (
        <div>
            <NavBar onSearch={handlePokemonSearch} />
            <Routes>
                <Route path='/' element={<Outlet />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/pokemon/:name' element={<PokemonDisplay />} />
                </Route>
            </Routes>
        </div>
    );
}
