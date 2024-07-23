import { Component } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
        activeItemId: null,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    };

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onCharListLoading = () => {
        this.setState({ newItemLoading: true });
    };

    onError = (error) => {
        console.error("Error loading characters:", error);
        this.setState({ error: true, loading: false });
    };

    handleEvent = (event, item) => {
        if (
            event.type === "click" ||
            event.key === "Enter" ||
            event.key === " "
        ) {
            this.setState({ activeItemId: item.id });
            this.props.onSelectedChar(item.id);
        }
    };

    renderItems = (charList, activeItemId) => {
        return charList.map((item) => {
            const imgClass = item.thumbnail.includes("image_not_available.jpg")
                ? "char__image char__image_fill"
                : "char__image";

            return (
                <li
                    tabIndex={0}
                    onClick={(event) => this.handleEvent(event, item)}
                    onKeyDown={(event) => this.handleEvent(event, item)}
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

    render() {
        const {
            charList,
            loading,
            error,
            newItemLoading,
            offset,
            charEnded,
            activeItemId,
        } = this.state;
        const items = this.renderItems(charList, activeItemId);
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
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
};

export default CharList;
