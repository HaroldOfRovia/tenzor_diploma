import { ReactElement, useEffect, useState } from 'react';
import { TopArtistCard, ArtistCardValues } from './TopArtistCard';
import { getTopArtists, getRandomPictures } from '../../collectData';

/**
 * @returns ReactElement со списком карточек лучших исполителей
 */
export const TopArtists = () => {
    const propsList: ArtistCardValues[] = [];
    const [topArtists, setTopArtists] = useState<ReactElement[]>(initArtists());


    /**
     * @returns массив с карточками лучших артистов с данными по умолчанию
     */
    function initArtists():ReactElement[]{
        const artists = [];
        for (let i = 0; i < 12; i++) {
            propsList.push({name: 'Something went wrong', pic: '../../images/topSinger.jpg', picAlt: 'pic'});
            artists.push(<TopArtistCard key={i} name={propsList[i].name} pic={propsList[i].pic} picAlt={propsList[i].picAlt}/>);
        }
        return artists;
    }

    /**
     * обновляет массив рекат элементов
     */
    function updateList(){
        const artists = [];
        for (let i = 0; i < 12; i++) {
            artists.push(<TopArtistCard key={i} name={propsList[i].name} pic={propsList[i].pic} picAlt={propsList[i].picAlt}/>);
        }
        setTopArtists(artists);
    }

    /**
     * обновляет пропсы (имя артиста и alt для изображения) для карточек артистов
     */
    async function setArtistsName(){
        let names = await getTopArtists(12);
        if (names === undefined)
            return;
        for(let i = 0; i < topArtists.length; i++){
            propsList[i].name = names[i];
            propsList[i].picAlt = names[i];
        }
        updateList();
    }

    /**
     * обновляет пропсы (изображение) для карточек артистов
     */
    async function setArtistsPic(){
        let pictures = await getRandomPictures(12, 150);
        if (pictures === undefined)
            return;
        for(let i = 0; i < topArtists.length; i++){
            propsList[i].pic = pictures[i];
        }
        updateList();
    }

    useEffect(() => {
        setArtistsName();
        setArtistsPic();
    }, []);

    return(
        <div className='topic'>
            <h2 className='topic-header'>Hot right now</h2>
            <div className='center'><hr className='red-line'/></div>
            <div className='top-singers'>
            {/* <!-- сюда вставляются топ авторов --> */}
                { topArtists }
            </div>
        </div>
    )
}