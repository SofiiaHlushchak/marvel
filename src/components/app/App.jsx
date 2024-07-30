import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../ComicsList/ComicsList";
const App = () => {
    // const [selectedChar, setSelectedChar] = useState(null);

    // const onSelectedChar = (id) => {
    //     setSelectedChar(id);
    // };
    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    {/* <ErrorBoundary>
                        <CharList onSelectedChar={onSelectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary> */}
                </div>
                <ErrorBoundary>
                    <ComicsList />
                </ErrorBoundary>
            </main>
        </div>
    );
};

export default App;
