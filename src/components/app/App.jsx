import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";

class App extends Component {
    state = {
        selectedChar: null,
    };

    onSelectedChar = (id) => {
        this.setState({ selectedChar: id });
    };
    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList onSelectedChar={this.onSelectedChar} />
                        <CharInfo charId={this.state.selectedChar} />
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
