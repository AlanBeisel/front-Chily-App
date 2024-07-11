import { Popular } from '../app/components/HomeComponents/Popular';
import { CategoryFilter } from '../app/components/MenuComponents/CategoryFilter';
import Horarios from './components/HomeComponents/Horarios';
import { RenderCategory } from './components/HomeComponents/RenderCategory';

export default function Home() {

  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <div className="w-full flex justify-center">
        <main className="w-full flex-grow p-4">
          <CategoryFilter />
          <Horarios />
          <Popular />
          <RenderCategory />
        </main>
      </div>
    </>
  );
}
