'use client';
import { Promotions } from '../app/components/HomeComponents/Promotions';
import { Popular } from '../app/components/HomeComponents/Popular';
import { CategoryFilter } from '../app/components/MenuComponents/CategoryFilter';
import { RenderCategory } from './components/HomeComponents/RenderCategory';



export default function Home() {

   
  
  return (
    <>
      <div className="w-full flex justify-center">
        <main className="w-full flex-grow p-4">
          <CategoryFilter />
          <Promotions />
          <Popular />
          <RenderCategory />          
        </main>
      </div>
    </>
  );
}
