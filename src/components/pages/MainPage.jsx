import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearchForm from "../CharSearchForm/CharSearchForm";

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList
                        onSelectedChar={setSelectedChar}
                        activeItem={selectedChar}
                    />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo char={selectedChar} />
                </ErrorBoundary>
                <CharSearchForm />
            </div>
        </>
    );
};

export default MainPage;
