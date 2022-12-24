import image from '../../images/fly.jpg'
import { SearchResult } from "./SearchResult"
import { findArtist, findAlbum  } from '../../collectData';
import { TrackSearch } from './TrackSeacrh';

export interface SearchInput {
    input: string
}

/**
 * @param интерфейс SearchInput (значение поиска)
 * @returns ReactElement страницы поиска
 */
export const SearchPage = function ({input} : SearchInput) {

    return( 
        <main className='search-page'>
            <h2 className='bold-font search-header'>Search results for 
                            “{input}”</h2>
            <div className='search-result'>
                <div className='link'>
                    <h3 className='search-topic'>Artists</h3>
                </div>
                <SearchResult input={ input } func={ findArtist(input, 8) }/>
                <div className='link'>
                    <h3 className='search-topic'>Albums</h3>
                </div>
                <SearchResult input={ input } func={ findAlbum(input, 8) }/>
                <div className='link'>
                    <h3 className='search-topic'>Tracks</h3>
                </div>
                <div className='tracks'>
                    <TrackSearch input={ input}/>
                </div>
            </div>
        </main>
    )
}