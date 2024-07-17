import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../AppBanner/AppBanner";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";
import Skeleton from "../Skeleton/Skeleton";
import SingleComic from "../SingleComic/SingleComic";
import ComicsList from "../ComicsList/ComicsList";
const App = () => {
    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList />
                    <CharInfo />
                </div>
            </main>
        </div>
    );
};

export default App;
