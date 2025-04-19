import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ menu, setMenu, setShowTags  }) => {

  return (
    <>
        {/* desktop */}
        <nav className='hidden md:block navbar p-3 bg-gray-100 border-r border-r-gray-300 w-80 h-lvh'>
        <h2 className='font-bold text-lg mb-4'>CashFlow Tracker</h2>
        <ul className='p-2 space-y-2'>
            <NavLink to="/">
            {({ isActive }) => (
                <li className={`flex items-center p-2 px-5 rounded ${isActive ? 'bg-violet-800 text-white' : ''}`}>
                <ion-icon name="home-outline"></ion-icon>
                <span className="ml-5">Home</span>
                </li>
            )}
            </NavLink>
            <NavLink to="/add">
            {({ isActive }) => (
                <li className={`flex items-center p-2 px-5 rounded ${isActive ? 'bg-violet-800 text-white' : ''}`}>
                <ion-icon name="add-circle-outline"></ion-icon>
                <span className="ml-5">Add Transaction</span>
                </li>
            )}
            </NavLink>
            <NavLink to="/transactions">
            {({ isActive }) => (
                <li className={`flex items-center p-2 px-5 rounded ${isActive ? 'bg-violet-800 text-white' : ''}`}>
                <ion-icon name="stats-chart-outline"></ion-icon>
                <span className="ml-5">View Transactions</span>
                </li>
            )}
            </NavLink>
                <li onClick={() => setShowTags(true)} className={`flex items-center p-2 px-5 rounded `}>
                <ion-icon name="pricetag-outline"></ion-icon>
                <span className="ml-5">Manage Tags</span>
                </li>

        </ul>
        </nav>

        {/* Mobile */}
        <div onClick={() => setMenu(!menu)} className='text-3xl p-1 pt-2 fixed z-20 md:hidden block'>
            <ion-icon name="menu-outline"></ion-icon>
        </div>

        {menu &&

        <nav className=' p-2 bg-gray-100 w-48 h-lvh fixed z-10 md:hidden '>
        <h2 className='font-bold text-lg mb-4 mt-8'>CashFlow Tracker</h2>
        <ul className=' space-y-2'>
            <NavLink to="/">
            {({ isActive }) => (
                <li className={`flex items-center p-2 px-5 rounded ${isActive ? 'bg-violet-800 text-white' : ''}`}>
                <ion-icon name="home-outline"></ion-icon>
                <span className="ml-5">Home</span>
                </li>
            )}
            </NavLink>
            <NavLink to="/add">
            {({ isActive }) => (
                <li className={`flex items-center p-2 px-5 rounded ${isActive ? 'bg-violet-800 text-white' : ''}`}>
                <ion-icon name="add-circle-outline"></ion-icon>
                <span className="ml-5">Add Transaction</span>
                </li>
            )}
            </NavLink>
            <NavLink to="/transactions">
            {({ isActive }) => (
                <li className={`flex items-center p-2 px-5 rounded ${isActive ? 'bg-violet-800 text-white' : ''}`}>
                <ion-icon name="stats-chart-outline"></ion-icon>
                <span className="ml-5">View Transactions</span>
                </li>
            )}
            </NavLink>
                <li onClick={() => setShowTags(true)} className={`flex items-center p-2 px-5 rounded `}>
                <ion-icon name="pricetag-outline"></ion-icon>
                <span className="ml-5">Manage Tags</span>
                </li>
        </ul>
        </nav>
        }
        
    </>
    
  );
};

export default Navigation;
