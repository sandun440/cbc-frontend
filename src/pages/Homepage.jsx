import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../component/header';
import LoginPage from './Loginpage';
import ProductOverview from './home/productOverview';

export default function HomePage() {
  return(
    <div className = "w-full h-screen bg-gray-200">
        <Header/>
        
        <div className='w-full h-[calc(100vh-100px)]'>
          <Routes path="/*">
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/productInfo/:id" element={<ProductOverview/>} />
          </Routes>
        </div>
        

    </div>
  );
}