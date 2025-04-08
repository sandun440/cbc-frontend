import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../component/header';
import LoginPage from './LoginPage';
import ProductOverview from './home/productOverview';
import ProductPage from './home/product';
import Cart from './home/cart';
import ShippingPage from './home/shipping';
import MyOrdersPage from './home/orders';
import HomePageBody from './home/homePageBody';
import Footer from '../component/footer';
import FixedCartIcon from '../component/fixedCartIcon';



export default function HomePage() {
  return(
    <div className = "w-full h-full bg-gray-300">
        <Header/>
        <div className='w-full h-full'>
          <Routes path="/*">
            <Route path="/" element={<HomePageBody/>} />
            <Route path="/products" element={<ProductPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/shipping' element={<ShippingPage/>} />
            <Route path='/orders' element={<MyOrdersPage/>}/>
            <Route path="/productInfo/:id" element={<ProductOverview/>} />
          </Routes>
        </div>
        <FixedCartIcon/>
        <Footer/>
    </div>
  );
}