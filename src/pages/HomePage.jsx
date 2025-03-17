import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../component/header';
import LoginPage from './LoginPage';
import ProductOverview from './home/productOverview';
import ProductPage from './home/product';
import Cart from './home/cart';
import ShippingPage from './home/shipping';
import MyOrdersPage from './home/orders';



export default function HomePage() {
  return(
    <div className = "w-full h-screen bg-gray-200">
        <Header/>
        
        <div className='w-full h-[calc(100vh-100px)]'>
          <Routes path="/*">
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/products" element={<ProductPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/shipping' element={<ShippingPage/>} />
            <Route path='/orders' element={<MyOrdersPage/>}/>
            <Route path="/productInfo/:id" element={<ProductOverview/>} />
          </Routes>
        </div>
        

    </div>
  );
}