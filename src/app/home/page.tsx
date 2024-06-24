import { Navbar } from '../components/NavBar/navBar';
import { Promotions } from '../components/HomeComponents/Promotions';
import { Popular } from '../components/HomeComponents/Popular';
import { SearchBar } from '../components/SearchBar/searchBar';
import { CategoryFilter } from '../components/MenuComponents/CategoryFilter';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100">
      <div className="w-full flex justify-center">
      <div className="w-10/12 md:w-8/12 lg:w-7/12">
        <Navbar />
        <main className="flex-grow p-4">
          <SearchBar />
          <CategoryFilter />
          <Promotions />
          <Popular />
        </main>
      </div>
      </div>
    </div>
  );
}
