import { useEffect, useState } from "react";
import { SongCardValues, TopSongCard } from "./TopSongCard";
import { getRandomPictures, getTopSongs } from '../../collectData';
import image from '../../images/topSinger.jpg'

/**
 * @returns ReactElement со списком карточек лучших треков
 */
export const TopSongsList = () => {
    // const propsList: SongCardValues[] = [];
    // const [topSongs, setTopSongs] = useState<ReactElement[]>(initSongs());


    // /**
    //  * @returns массив с карточками лучших треков с данными по умолчанию
    //  */
    // function initSongs():ReactElement[]{
    //     let songs = [];
    //     for (let i = 0; i < 6; i++) {
    //         propsList.push({name: 'Something went wrong', artist: 'err', pic: '../../images/trackImg.jpg'});
    //         songs.push(<TopSongCard key={i} name={propsList[i].name} artist={propsList[i].artist} pic={propsList[i].pic}/>);
    //     }
    //     return songs;
    // }

    // /**
    //  * обновляет массив рекат элементов
    //  */
    // function updateList(){
    //     const songs = [];
    //     for (let i = 0; i < 6; i++) {
    //         songs.push(<TopSongCard key={i} name={propsList[i].name} artist={propsList[i].artist} pic={propsList[i].pic}/>);
    //     }
    //     setTopSongs(songs);
    // }

    // /**
    //  * обновляет пропсы (имя песни и имя исполнителя) для карточек треков
    //  */
    // async function setSongsName(){
    //     let songs = await getTopSongs(6);
    //     if (songs === undefined)
    //         return;
    //     for(let i = 0; i < songs.length; i++){
    //         propsList[i].name = songs[i].name;
    //         propsList[i].artist = songs[i].artist;
    //     }
    //     updateList();
    // }

    // /**
    //  * обновляет пропсы (изображение) для карточек треков
    //  */
    // async function setSongsPic(){
    //     let pictures = await getRandomPictures(6, 150);
    //     if (pictures === undefined)
    //         return;
    //     for(let i = 0; i < pictures.length; i++){
    //         propsList[i].pic = pictures[i];
    //     }
    //     updateList();
    // }

    // useEffect(() => {
    //     async function qwe() {
    //         await setSongsName();
    //         await setSongsPic();
    //     }
    //     qwe();
    // }, []);

    const [topSongs, setTopSongs] = useState<SongCardValues[]>([]);

    async function setSongsName() {
        let names = await getTopSongs(12);
        let arr = [];
        if (names === undefined)
            return;
        for(let i = 0; i < 12; i++){
            arr.push({key: i, name: names[i].name, artist: names[i].artist, pic: image, picAlt: names[i].name});
        }
        return arr;
    }

    async function setPic(arr: SongCardValues[] | undefined) {
        let pictures = await getRandomPictures(12, 150);
        if (pictures === undefined || arr === undefined)
            return;
        for(let i = 0; i < 12; i++){
            arr[i].pic = pictures[i];
        }
    }

    useEffect(() => {
        async function qwe() {
            let arr = await setSongsName();
            if(arr !== undefined)
                setTopSongs(arr);
            await setPic(arr);
            if(arr !== undefined)
                setTopSongs([...arr]);
        }
        qwe();
    }, []);

    return(
        <div className='topic'>
            <h2 className='topic-header'>Popular tracks</h2>
            <div className='center'><hr className='red-line'/></div>
            <div className='top-tracks'>
            {/* <!-- сюда вставляются топ треков --> */}
                { topSongs.map((a) => {
                    return <TopSongCard key={a.key} name={a.name} artist={a.artist} pic={a.pic} picAlt={a.picAlt}/>
                }) }
            </div>
        </div>
    )
}