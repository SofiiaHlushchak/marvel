import "./singleCharacterLayout.scss";

const SingleCharacterLayout = ({ data, navigate }) => {
    const { name, description, thumbnail } = data;

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="single-char">
            <img
                src={thumbnail}
                alt={name}
                className="single-char__char-img"
            />
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <button onClick={handleGoBack} className="single-char__back">
                Go back
            </button>
        </div>
    );
};

export default SingleCharacterLayout;
