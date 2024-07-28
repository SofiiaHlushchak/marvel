import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [activeItemId, setActiveItemId] = useState(null);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
            .finally(() => setLoading(false));
    };

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
    };

    const onCharListLoading = () => {
        setNewItemLoading(true);
    };

    const onError = (error) => {
        console.error("Error loading characters:", error);
        setError({ error: true });
    };

    const handleEvent = (event, item) => {
        if (
            event.type === "click" ||
            event.key === "Enter" ||
            event.key === " "
        ) {
            setActiveItemId(item.id);
            props.onSelectedChar(item.id);
        }
    };

    const renderItems = (charList, activeItemId) => {
        return charList.map((item) => {
            const imgClass = item.thumbnail.includes("image_not_available.jpg")
                ? "char__image char__image_fill"
                : "char__image";

            return (
                <li
                    tabIndex={0}
                    onClick={(event) => handleEvent(event, item)}
                    onKeyDown={(event) => handleEvent(event, item)}
                    key={item.id}
                    className={
                        activeItemId === item.id
                            ? "char__item char__item_selected"
                            : "char__item"
                    }
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        className={imgClass}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
    };
    const items = renderItems(charList, activeItemId);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            <ul className="char__grid">{items}</ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? "none" : "" }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
};

export default CharList;
