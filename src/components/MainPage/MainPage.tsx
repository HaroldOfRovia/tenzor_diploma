import { TopArtists } from './TopArtistsList';
import { TopSongsList } from './TopSongsList';


/**
 * @returns ReactElement главной старницы
 */
export const MainPage = function () {
    return(
        <main className='main'>
            <h1 className='bold-font main-topic'>Music</h1>
            <TopArtists/>
            <TopSongsList/>
        </main>
    )
}
