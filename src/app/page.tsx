import { getAllCategories, getProducts } from '@/helpers/peticiones';
import { Popular } from '../app/components/HomeComponents/Popular';
import { CategoryFilter } from '../app/components/MenuComponents/CategoryFilter';
import Horarios from './components/HomeComponents/Horarios';
import { RenderCategory } from './components/HomeComponents/RenderCategory';
import {useEffect, useState} from 'react'
import { IoIosArrowUp } from 'react-icons/io';


export default async function Home() {

  const categories = await getAllCategories();
  //Todo: Limited to 1000 products. 
   const products = await getProducts(1, 1000);
   const popularProducts = products.filter((product) => product.isPopular);


  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <div className="w-full flex justify-center">
        <main className="w-full flex-grow p-4">
          <CategoryFilter categories={categories} />
          <Horarios />
          <Popular popularProducts={popularProducts}/>
          <RenderCategory categories={categories} />
        </main>
      </div>
    </>
  );
}
