export interface SearchCardValues {
    mainText: string;
    subText: string;
    picture: string;
    alt: string;
}

/**
 * @param интерфес SearchCardValues
 * @returns ReactElement квадратной карточки поиска
 */
export const SearchCard = ({mainText, subText, picture, alt}: SearchCardValues) => {
    return(
        <div className="link item-result white-text">
            <div className='search-card-text'>{ subText }</div>
            <h3 className='search-card-text'>{ mainText }</h3>
            <img src={ picture } className='search-card-image' alt={ alt }/>
        </div>
    )
}