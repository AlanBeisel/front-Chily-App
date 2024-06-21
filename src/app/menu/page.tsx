import React from 'react';
import { Navbar } from "../components/NavBar/navBar";
import { SearchBar } from '../components/SearchBar/searchBar';
import { CategoryFilter } from '../components/MenuComponents/CategoryFilter';
import { MenuList } from '../components/MenuComponents/MenuList';


export default function Menu() {
    return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow p-4">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Menu</h1>
        <p className="text-gray-600 mb-4">ShopBite - Feast The Essence</p>
        <SearchBar />
        <CategoryFilter />
        <MenuList />
        </main>
    </div>
    );
}