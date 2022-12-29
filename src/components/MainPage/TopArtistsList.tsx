import { useEffect, useState } from 'react';
import { TopArtistCard, ArtistCardValues } from './TopArtistCard';
import { getTopArtists, getRandomPictures } from '../../collectData';
import image from '../../images/topSinger.jpg'

/**
 * @returns ReactElement со списком карточек лучших исполителей
 */
export const TopArtists = () => {
    const [topArtists, setTopArtists] = useState<ArtistCardValues[]>([]);

    async function setArtistsName() {
        let names = await getTopArtists(12);
        let arr = [];
        if (names === undefined)
            return;
        for(let i = 0; i < 12; i++){
            arr.push({key: i, name: names[i], pic: image, picAlt: names[i]});
        }
        return arr;
    }

    async function setPic(arr: ArtistCardValues[] | undefined) {
        let pictures = await getRandomPictures(12, 150);
        if (pictures === undefined || arr === undefined)
            return;
        for(let i = 0; i < 12; i++){
            arr[i].pic = pictures[i];
        }
    }

    useEffect(() => {
        async function qwe() {
            let arr = await setArtistsName();
            if(arr !== undefined)
                setTopArtists(arr);
            await setPic(arr);
            if(arr !== undefined)
                setTopArtists([...arr]);
        }
        qwe();
    }, []);

    return(
        <div className='topic'>
            <h2 className='topic-header'>Hot right now</h2>
            <div className='center'><hr className='red-line'/></div>
            <div className='top-singers'>
            {/* <!-- сюда вставляются топ авторов --> */}
                { topArtists.map((a) => {
                    return <TopArtistCard key={a.key} name={a.name} pic={a.pic} picAlt={a.picAlt}/>
                }) }
            </div>
        </div>
    )
}