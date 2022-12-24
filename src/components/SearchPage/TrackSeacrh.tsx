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
    const [cards, setCards] = useState<ReactElement[]>(initCards());


    /**
     * @returns массив с карточками треков с данными по умолчанию
     */
    function initCards():ReactElement[]{
        const list = [];
        for(let i = 0; i < 8; i++){
            propsList.push({name: 'Something went wrong', artist: 'error', time: 'error', pic: image });
            list.push(<TrackCard key={i} name={propsList[i].name} artist={propsList[i].artist}
                time={propsList[i].time} pic={propsList[i].pic}/>)
        } 
        return list;
    }

    
    /**
     * обновляет массив рекат элементов
     */
    function updateList(){
        const list = [];
        for (let i = 0; i < 8; i++) {
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
        for(let i = 0; i < cards.length; i++){
            propsList[i].name = data[i].name;
            propsList[i].artist = `${data[i].artist}`;
            propsList[i].time = `${ Math.round( Math.random() * 12 ) }:${ Math.round( Math.random() * 60 ) }`
        }
        updateList();
    }

    /**
     * обновляет пропсы (изображение) для карточек поиска
     */
    async function setPic(){
        let pictures = await getRandomPictures(12, 200);
        if (pictures === undefined)
            return;
        for(let i = 0; i < cards.length; i++){
            propsList[i].pic = pictures[i];
        }
        updateList();
    }

    useEffect(() => {
        setTracks();
        setPic();
    }, [input]);

    return (
        <>
            { cards }
        </>
    )
}