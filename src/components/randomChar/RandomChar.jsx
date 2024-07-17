import { Component } from "react";
import MarvelService from "../../services/MarvelService";

import "./randomChar.scss";
import decoration from "../../resources/img/Decoration.png";

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateChar();
    }

    state = {
        char: {},
    };

    onCharLoad = (char) => this.setState({ char });

    marvelService = new MarvelService();

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getCharacter(id).then(this.onCharLoad);
    };
    render() {
        const a =
            "As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...";
        console.log(a.length);
        const {
            char: { name, description, thumbnail, homepage, wiki },
        } = this.state;
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Thor" />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar_btns">
                            <a href={homepage} className="button button__main">
                                HOMEPAGE
                            </a>
                            <a href={wiki} className="button button__secondary">
                                WIKI
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <div>
                        <p className="randomchar__title">
                            Random character for today!
                        </p>
                        <p className="randomchar__title">
                            Do you want to get to know him better?
                        </p>
                    </div>
                    <div>
                        <p className="randomchar__title">
                            Or choose another one
                        </p>
                        <button className="button button__main">TRY IT</button>
                    </div>
                    <img
                        src={decoration}
                        alt="Decoration"
                        className="randomchar__decoration"
                    />
                </div>
            </div>
        );
    }
}

export default RandomChar;
