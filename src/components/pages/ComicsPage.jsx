import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../ComicsList/ComicsList";
import AppBanner from "../AppBanner/AppBanner";

const ComicsPage = () => {
    return (
        <>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </>
    );
};

export default ComicsPage;
