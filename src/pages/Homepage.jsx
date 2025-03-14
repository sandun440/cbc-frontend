import React from 'react';
import { Routes } from 'react-router-dom';
import Header from '../component/header';

export default function HomePage() {
  return(
    <div className = "w-full h-screen bg-gray-200">
        <Header/>
        <Routes path="/*"></Routes>

    </div>
  );
}
