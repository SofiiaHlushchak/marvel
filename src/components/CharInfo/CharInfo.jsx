import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar(props.char);
    }, [props.char]);

    const updateChar = (char) => {
        setChar(char);
    };

    return (
        <div className="char__info">
            {!char && <Skeleton />}
            {char && <View char={char} />}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description.length > 210
                    ? `${description.slice(0, 210)}...`
                    : description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0
                    ? null
                    : "There is no comics with this character"}
                {comics.map((item, i) => {
                    // eslint-disable-next-line
                    if (i > 9) return;
                    return (
                        <li key={i} className="char__comics-item">
                            <Link
                                to={
                                    item.resourceURI.match(
                                        /v1\/public\/(.+)/
                                    )[1]
                                }
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default CharInfo;
