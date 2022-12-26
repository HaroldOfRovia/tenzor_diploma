import { ReactElement, useEffect, useState } from 'react';
import { findTrack, getRandomPictures } from '../../collectData';
import image from '../../images/fly.jpg'
import { SearchInput } from "./SearchPage";
import { TrackCard, TrackCardValues } from './TrackCard';

/**
 * @param интерфейс SearchInput 
 * @returns ReactElement со списком карточек треков для страницы поиска
 */
export const TrackSearch = ({input}: SearchInput) => {
    const propsList: TrackCardValues[] = [];
    const [cards, setCards] = useState<ReactElement[]>([]);

    
    /**
     * обновляет массив рекат элементов
     */
    function updateList(){
        const list = [];
        for (let i = 0; i < propsList.length; i++) {
            list.push(<TrackCard key={i} name={propsList[i].name} artist={propsList[i].artist}
                time={propsList[i].time} pic={propsList[i].pic}/>);
        }
        setCards(list);
    }

    /**
     * обновляет пропсы (назавние трека, имя исполнителя и время) для карточек поиска
     */
    async function setTracks() {
        const data = await findTrack(input, 8);
        if (data === undefined)
            return;
        for(let i = 0; i < data.length; i++){
            propsList.push({ name: data[i].name,  artist: `${data[i].artist}`, 
                time: `${ Math.round( Math.random() * 12 ) }:${ Math.round( Math.random() * 60 ) }`, pic: image})
        }
        updateList();
    }

    /**
     * обновляет пропсы (изображение) для карточек поиска
     */
    async function setPic(){
        let pictures = await getRandomPictures(propsList.length, 200);
        if (pictures === undefined)
            return;
        for(let i = 0; i < propsList.length; i++){
            propsList[i].pic = pictures[i];
        }
        updateList();
    }

    useEffect(() => {
        async function qwe() {
            await setTracks();
            await setPic();
        }
        qwe();
    }, [input]);

    return (
        <>
            { cards }
        </>
    )
}