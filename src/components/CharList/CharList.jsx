import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllCharacters(offset).then(onCharListLoaded);
    };

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        if (!charList.length) {
            props.onSelectedChar(newCharList[0]);
        }

        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
    };

    const handleEvent = (event, item) => {
        if (
            event.type === "click" ||
            event.key === "Enter" ||
            event.key === " "
        ) {
            props.onSelectedChar(item);
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
    const items = renderItems(charList, props.activeItem?.id);
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
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
                onClick={() => onRequest(offset, false)}
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
