import { Navbar } from "../components/NavBar/navBar";
import { Promotions, } from "../components/HomeComponents/Promotions";
import { DailyOffer } from "../components/HomeComponents/DailyOffer";
import { Popular } from "../components/HomeComponents/Popular";
import { SearchBar } from "../components/SearchBar/searchBar";


export default function Home() {

    return(
        <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow p-4">
        <SearchBar/>
        <Promotions />
        <DailyOffer/>
        <Popular/>
        </main>
      </div>
    )
}