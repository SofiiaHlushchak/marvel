import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

class CharList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        charList: [],
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    updateChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoad)
            .catch(this.onError);
    };

    onCharListLoad = (charList) => {
        this.setState({ charList, loading: false });
    };

    onError = (error) => {
        console.error("Error loading characters:", error);
        this.setState({ error: true, loading: false });
    };

    renderItems = (charList) => {
        return charList.map((item) => {
            const imgClass = item.thumbnail.includes("image_not_available.jpg")
                ? "char__image char__image_fill"
                : "char__image";

            return (
                <li
                    onClick={() => this.props.onSelectedChar(item.id)}
                    key={item.id}
                    className="char__item"
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

    render() {
        const { charList, loading, error } = this.state;
        const items = this.renderItems(charList);
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                <ul className="char__grid">{items}</ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
