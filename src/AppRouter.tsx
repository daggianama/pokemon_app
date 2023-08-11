import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { PokemonDisplay } from './components/PokemonDisplay';
import { Home } from './pages/Home';


export const AppRouter = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={<Outlet />}>
                
                
                    <Route index element={<Home />} />
                    <Route path='/pokemon/:id' element={<PokemonDisplay />} />
                    
                    
                </Route>
            </Routes>
       
            
        </div>
    );
}
    