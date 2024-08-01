import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const ComicsList = () => {
    const [comicList, setComicList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicEnded, setComicEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllComics(offset).then(onComicListLoaded);
    };

    const onComicListLoaded = (newComicList) => {
        let ended = false;
        if (newComicList.length < 8) {
            ended = true;
        }

        setComicList((comicList) => [...comicList, ...newComicList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 8);
        setComicEnded(ended);
    };

    const renderItems = (comicList) => {
        return comicList.map((comic) => {
            const imgClass = comic.thumbnail.includes("image_not_available.jpg")
                ? "comics__item-img comics__item-img_fill"
                : "comics__item-img";
            return (
                <li className="comics__item" key={comic.id}>
                    <Link to={`/comics/${comic.id}`}>
                        <img
                            src={comic.thumbnail}
                            alt={comic.title}
                            className={imgClass}
                        />
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </Link>
                </li>
            );
        });
    };

    const items = renderItems(comicList);
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">{items}</ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: comicEnded ? "none" : "" }}
                onClick={() => onRequest(offset, false)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
