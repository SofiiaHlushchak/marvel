class MarvelService {
    _apiBase = process.env.REACT_APP_API_BASE;
    _apiKey = process.env.REACT_APP_API_KEY;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResource(
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
        );

        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async (id) => {
        const res = await this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );

        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (res) => {
        return {
            id: res.id,
            name: res.name ? res.name : "There is no name for this character",
            description: res.description
                ? `${res.description.slice(0, 210)}...`
                : "There is no description for this character",
            thumbnail: res.thumbnail.path + "." + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items,
        };
    };
}

export default MarvelService;
