buildMainPage();

/**
 * наполняет страницу главным контентом
 */
async function buildMainPage(){
    let header = document.getElementsByClassName('header')[0],
        main = document.createElement('main');
    main.className = 'main';
    main.innerHTML = `<h1 class='bold-font main-topic'>Music</h1>
                    <div class='topic'>
                        <h2 class='topic-header'>Hot right now</h2>
                        <div class='center'><hr class='red-line'/></div>
                        <div class='top-singers'>
                        <!-- сюда вставляются топ авторов -->
                        </div>
                    </div>
                    <div class='topic'>
                        <h2 class='topic-header'>Popular tracks</h2>
                        <div class='center'><hr class='red-line'/></div>
                        <div class='top-tracks'>
                        <!-- сюда вставляются топ треков -->
                        </div>
                    </div>`;
    header.after(main);

    let searchForm = document.getElementsByClassName('search-field-container')[0];
    searchForm.onsubmit = function (event) {
        event.preventDefault();
        buildSearchPage();
    }

    await insertChart();
    await insertTracks();
    await setChartArtistImages();
    await setChartTracksImages();
}

/**
 * @param {*} size размер квадратного изображения в px
 * @returns случайное изображение
 */
 async function getRandomImage(size = 150){
    try{
        let response = await fetch(`https://picsum.photos/${size}`);
        return response.url;
    } catch (err) {
        console.error(err);
    }
}

/**
 * @param {*} url ссылка на api
 * @returns json в виде объекта
 */
async function getJson(url){
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`response status: ${response.status}`);
        }
    } catch (err){
        console.error(err);
    }
}

/**
 * создает html элемент для списка лучших исполнителей
 * @param {*} pic адрес картинки
 * @param {*} alt текст для картинки
 * @param {*} name имя автора
 * @returns html элемент лучшего исполнителя
 */
function getTopArtistCard(pic, alt, name){
    let card = document.createElement("a");
    card.className = 'singer link';
    card.setAttribute('href', '') ;
    card.innerHTML = `<img src="${pic}" class="round-singer-ico" alt="${alt}"/>
                            <h3 class='name'>${name}</h3>`;
    return card;
}

/**
 * @param {*} size размер топа исполнителей
 * @returns массив с именами лучших исполнителей
 */
async function getChartArtists(size){
    try{
        let data = await getJson(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json&limit=${size}`),
            chart = [];
        for (let i = 0; i < size; i++){
            chart.push(data.artists.artist[i].name);
        }
        return chart;
    } catch (err) {
        console.error(err);
    }
}

/**
 * вставляет в страницу 12 карточек лучших иполнителей
 */
async function insertChart(){
    const chartPlace = document.getElementsByClassName('top-singers')[0],
        size = 12,
        chart = await getChartArtists(size);
    for(let i = 0; i < size; i++){
        chartPlace.append(getTopArtistCard("../src/images/topSinger.jpg", chart[i], chart[i]));
    }
}

/**
 * устанавливает карточкам в топе изображения
 */
async function setChartArtistImages(){
    const topSingers = document.getElementsByClassName('singer');
    let images = [];
    for(let i = 0; i < topSingers.length; i++){
        images.push(await getRandomImage());
    }
    for(let i = 0; i < topSingers.length; i++){
        topSingers[i].getElementsByTagName("img")[0].setAttribute("src", images[i]);
    }
}

/**
 * @param {*} size размер топа песен
 * @returns массив объектов с полями name - имя песни, artist - имя исполнителя
 */
async function getChartTrack(size){
    try{
        let data = await getJson(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json&limit=${size}`),
            chart = [];
        for (let i = 0; i < size; i++){
            chart.push({name: data.tracks.track[i].name, artist: data.tracks.track[i].artist.name});
        }
        return chart;
    } catch (err) {
        console.error(err);
    }
}

/**
 * @param {*} pic адрес изображения
 * @param {*} alt текст изображения
 * @param {*} trackName название песни
 * @param {*} artistName имя исполнителя
 * @returns 
 */
function getTopTrackCard(pic, alt, trackName, artistName){
    let card = document.createElement("a");
    card.className = 'track link';
    card.setAttribute('href', '');
    card.innerHTML = `<img src='${pic}' class='track-ico' alt="${alt}"/>
                        <h3 class='name'>${trackName}</h3>
                        <div class='casual-text'>${artistName}</div>`;
    return card;
}

/**
 * вставляет в страницу 6 карточек лучших песен
 */
async function insertTracks(){
    const chartPlace = document.getElementsByClassName('top-tracks')[0],
        size = 6,
        chart = await getChartTrack(size);
    for(let i = 0; i < size; i++){
        chartPlace.append(getTopTrackCard("../src/images/trackImg.jpg", chart[i].name, chart[i].name, chart[i].artist));
    }
}

/**
 * устанавливает лучшим песням изображения
 */
async function setChartTracksImages(){
    const topTracks = document.getElementsByClassName('track');
    let images = [];
    for(let i = 0; i < topTracks.length; i++){
        images.push(await getRandomImage());
    }
    for(let i = 0; i < topTracks.length; i++){
        topTracks[i].getElementsByTagName("img")[0].setAttribute("src", images[i]);
    }
}

/**
 * удаляет текущий тег main со всем его содержимым и вставляет main, содержащий в себе страницу поиска.
 * производит поиск авторов, альбомов и треков по введеному тексту в поле поиска.
 */
async function buildSearchPage(){
    let header = document.getElementsByClassName('header')[0],
        searchPage = document.createElement('main'),
        main = document.getElementsByTagName('main')[0];
    main.remove();
    searchPage.className = 'search-page';
    searchPage.innerHTML = `<h2 class='bold-font search-header'>Search results for 
                            “${document.getElementsByClassName('search-field')[0].value}”</h2>
                            <div class='search-result'>
                                <a href='./index.html' class='link'>
                                    <h3 class='search-topic'>Artists</h3>
                                </a>
                                <div class='grid-search-result'>
                                    <!-- сюда вставляются карточки артистов -->
                                </div>
                                <a href='./index.html' class='link'>
                                    <h3 class='search-topic'>Albums</h3>
                                </a>
                                <div class='grid-search-result'>
                                    <!-- сюда вставляются карточки альбомов -->
                                </div>
                                <a href='./index.html' class='link'>
                                    <h3 class='search-topic'>Tracks</h3>
                                </a>
                                <div class='tracks'>
                                    <!-- сюда вставляются треки --> 
                                </div>
                            </div> `;
    header.after(searchPage);
    await insertSearchCardArtist();
    await insertSearchCardAlbums();
    await insertSearchTrack();
    await insertSearchCardImage();
}


/**
 * @param {*} pic изображение, которое будет установлено фоном
 * @param {*} mainText основной текст карточки (имя автора/альбома)
 * @param {*} subText текст, расположенный под основным текстом (количество прослушиваний/имя автора)
 * @returns карточку для страницы поиска
 */
function getSearchCard(pic, mainText, subText) {
    let card = document.createElement('div');
    card.className = 'link item-result white-text'
    card.innerHTML = `<div class='search-card-text'>${subText}</div>
                        <h3 class='search-card-text'>${mainText}</h3>
                        <img src='${pic}' class='search-card-image'/>`;
    return card;
}

/**
 * поиск исполнителя через api метод artist.search
 * @param {*} input потенциальное имя исполнителя
 * @returns массив объектов у которых поля: name - имя исполнителя, listeners - количество слушателей. 
 * Массив содержит в себе 8 (меньше, если не может найти столько) объектов.
 */
async function findArtist(input, size = 8){
    const data = await getJson(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${input}&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json&limit=${size}`),
        list = [];
    if(Object.keys(data).length == 0)
        return [];
    for(let i = 0; i < 8 && i < data.results.artistmatches.artist.length; i++){
        list.push({name: data.results.artistmatches.artist[i].name, listeners: data.results.artistmatches.artist[i].listeners})
    }
    return list;
}

/**
 * вставляет в страницу посика карточки исполнителей
 */
async function insertSearchCardArtist(){
    const input = document.getElementsByClassName('search-field')[0].value,
        insertPlace = document.getElementsByClassName('grid-search-result')[0],
        list = await findArtist(input);
    for(let i = 0; i < list.length; i++) {
        insertPlace.append(getSearchCard('../src/images/fly.jpg', list[i].name, `${list[i].listeners} listeners`));
    }
}

/**
 * устанавливает случайные изображение в теге main
 */
async function insertSearchCardImage(){
    const cards = document.getElementsByTagName('main')[0].getElementsByTagName('img');
    let images = [];
    for(let i = 0; i < cards.length; i++) {
        images.push(await getRandomImage(170));
    }
    for(let i = 0; i < cards.length; i++) {
        cards[i].setAttribute('src', images[i]);
    }
}

/**
 * поиск альбома через api метод album.search
 * @param {*} input потенциальное имя альбома
 * @returns массив объектов у которых поля: name - имя альбома, artist - исполнитель. 
 * Массив содержит в себе 8 (меньше, если не может найти столько) объектов.
 */
async function findAlbum(input, size = 8){
    const data = await getJson(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${input}&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json&limit=${size}`),
        list = [];
    if(Object.keys(data).length == 0)
        return [];
    for(let i = 0; i < 8 && i < data.results.albummatches.album.length; i++){
        list.push({name: data.results.albummatches.album[i].name, artist: data.results.albummatches.album[i].artist})
    }
    return list;
}

/**
 * вставляет в страницу посика карточки альбомов
 */
async function insertSearchCardAlbums(){
    const input = document.getElementsByClassName('search-field')[0].value,
        insertPlace = document.getElementsByClassName('grid-search-result')[1],
        list = await findAlbum(input);
    for(let i = 0; i < list.length; i++) {
        insertPlace.append(getSearchCard('../src/images/fly.jpg', list[i].name, `${list[i].artist}`));
    }
}

/**
 * @param {*} pic изображение трека
 * @param {*} name имя трека
 * @param {*} artist исполнитель трека
 * @returns карточку трека
 */
function getTrackCard(pic, name, artist){
    const card = document.createElement('div');
    card.className = 'track-case link';
    card.innerHTML = `<img src="${pic}" class='mini-track-ico'>
                        <h4 class='track-name'>${name}</h4>
                        <div class='casual-text track-autor'>${artist}</div>
                        <div class='casual-text duration'>${Math.round( Math.random() * 10 )}:
                        ${Math.round( Math.random() * (60 - 10) + 10 )}</div>`;
    return card;
}

/**
 * поиск трека через api метод track.search
 * @param {*} input потенциальное имя трека
 * @returns массив объектов у которых поля: name - имя трека, artist - исполнитель. 
 * Массив содержит в себе 8 (меньше, если не может найти столько) объектов.
 */
async function findTrack(input, size = 8){
    const data = await getJson(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${input}&api_key=f621a1ddb47cdf58f1be3a218d7a0b27&format=json&limit=${size}`)
        list = [];
    if(Object.keys(data).length == 0)
        return [];
    for(let i = 0; i < 8 && i < data.results.trackmatches.track.length; i++){
        list.push({name: data.results.trackmatches.track[i].name, artist: data.results.trackmatches.track[i].artist})
    }
    return list;
}

/**
 * вставляет в страницу посика карточки треков
 */
async function insertSearchTrack(){
    const input = document.getElementsByClassName('search-field')[0].value,
        insertPlace = document.getElementsByClassName('tracks')[0],
        list = await findTrack(input);
    for(let i = 0; i < list.length; i++) {
        insertPlace.append(getTrackCard('../src/images/fly.jpg', list[i].name, `${list[i].artist}`));
    }
}