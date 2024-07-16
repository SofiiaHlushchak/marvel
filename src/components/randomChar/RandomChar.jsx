import "./randomChar.scss";
import thor from "../../resources/img/thor.jpeg";
import decoration from "../../resources/img/Decoration.png";

const RandomChar = () => {
    return (
        <div className="randomchar">
            <div className="randomchar__block">
                <img src={thor} alt="Thor" />
                <div className="randomchar__info">
                    <p className="randomchar__name">Thor</p>
                    <p className="randomchar__descr">
                        As the Norse God of thunder and lightning, Thor wields
                        one of the greatest weapons ever made, the enchanted
                        hammer Mjolnir. While others have described Thor as an
                        over-muscled, oafish imbecile, he's quite smart and
                        compassionate...
                    </p>
                    <div className="randomchar_btns">
                        <a href="#" className="button button__main">
                            HOMEPAGE
                        </a>
                        <a href="#" className="button button__secondary">
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
                    <p className="randomchar__title">Or choose another one</p>
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
};

export default RandomChar;
