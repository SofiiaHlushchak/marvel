import { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";
import decoration from "../../resources/img/Decoration.png";

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    const onCharLoaded = (char) => {
        setLoading(false);
        setChar(char);
    };

    const onCharLoading = () => {
        setLoading(true);
    };

    const onError = () => {
        setError(true);
        setLoading(false);
    };

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
        onCharLoading();
        marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
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
                    <p className="randomchar__title">Or choose another one</p>
                    <button
                        onClick={updateChar}
                        className="button button__main"
                    >
                        TRY IT
                    </button>
                </div>
                <img
                    src={decoration}
                    alt="Decoration"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    const imgClass = thumbnail.includes("image_not_available.jpg")
        ? "randomchar__image randomchar__image_fill"
        : "randomchar__image";
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className={imgClass} />
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
    );
};

export default RandomChar;
