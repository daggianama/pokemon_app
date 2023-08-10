import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { PokemonDisplay } from './components/PokemonDisplay';
import { Home } from './pages/Home';


export const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<PokemonDisplay />} />
                
                {/* <Route path='/' element={<NavBar />}>
                    <Route index element={<Home />} />
                    <Route path='/pokemon/:id' element={<PokemonDisplay />} />
                    
                    
                </Route> */}
        </Routes>
       
            
        </div>
    );
}
    