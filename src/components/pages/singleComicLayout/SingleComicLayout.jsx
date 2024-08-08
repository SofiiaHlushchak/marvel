import "./singleComicLayout.scss";

const SingleComicLayout = ({ data, navigate }) => {
    const { title, description, pageCount, thumbnail, language, price } = data;

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <button onClick={handleGoBack} className="single-comic__back">
                Go back
            </button>
        </div>
    );
};

export default SingleComicLayout;
