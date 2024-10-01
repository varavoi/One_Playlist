document.addEventListener('DOMContentLoaded', function () {
    // C:\Users\Вардан\Desktop\Google Расширения ПРИМЕР\От Мурада 18.09\Chrome_extension_saver 20.01\Chrome_extension_saver 20.01\popup.js
    //2222 
    const dataContainer = document.getElementById('dataContainer');
     dataContainer.style.display="none"
     
     let dcChildren = dataContainer.children
     let albums_Block = document.getElementById('albums_Block');
     albums_Block.style.display="none"
     let albumArr = []
     
     // Считываем данные из chrome.storage
     chrome.storage.local.get(['jsonArray','jsonAlbumArray'], (result) => {
             const jsonArray = result.jsonArray || []; // Если нет, создаем пустой массив
             const jsonAlbumArray = result.jsonAlbumArray || [];
             let createMyPlaylistButt = document.querySelector(".createMyPlaylistButt")
 
             //событие клика на создания нового альбома
              createMyPlaylistButt.addEventListener("click",function(e){
                     let nameAlbum = document.querySelector("#nameAlbum").value
                     let albObj = getInfoForAlbum(nameAlbum)
                     const jsonAlbumString = JSON.stringify(albObj)
                     jsonAlbumArray.push(jsonAlbumString)
                     
                         chrome.storage.local.set({ jsonAlbumArray }, () => {
                             console.log("Создан альбом ", jsonAlbumString)
                         })
                     
                     alert(`Альбом ${nameAlbum} успешно создан`)
                     
                 })
             let open_albumsButt=document.querySelector(".open_albumsButt")
                     //событие клика на окна для просмотра альбомов
                  open_albumsButt.addEventListener("click",function(e){
                   albums_Block.replaceChildren()
             // Отображаем данные в всплывающем окне
                         //console.log(jsonAlbumArray)
                         // Отображаем данные в всплывающем окне
                         jsonAlbumArray.forEach((item, index) => {
                             console.log(item)
                             let obj = parseJsonToObj(item)
                             let div = createAlbum(obj)[0]
                             // Создаем кнопку для удаления
                             const deleteButton = div.querySelector('.delAlbum');
                             let openAlbum = div.querySelector(".openAlbum")
 
                             deleteButton.addEventListener('click', (e) => {
                                 // Удаляем элемент по индексу
                                 jsonAlbumArray.splice(index, 1); // Удаляем элемент из массива
                                 //let elem = e.target.closest('container-audio')
                                 //alert(e.target)
                                 let nameAlbum = e.target.closest(".albumBlock").querySelector(".albumTitle").innerHTML
                                 albums_Block.removeChild(e.target.closest(".albumBlock"))
                                 // Сохраняем обновленный массив в chrome.storage
                                 chrome.storage.local.set({ jsonAlbumArray: jsonAlbumArray }, () => {
                                     console.log(`Элемент "${item}" удален.`);
                                     alert(`Альбом ${nameAlbum} успешно удален`)
                                     //updateUI(); // Обновляем интерфейс
                                 });
                             });
                             
                         openAlbum.addEventListener("click",function(e){
                                 let albumBlock = e.target.closest(".albumBlock")
                                                         
                                 for(let i =0;i<dcChildren.length;i++){
                                     
                                     if(dcChildren[i].className=="container-audio" && dcChildren[i].getAttribute("album")==albumBlock.getAttribute("album")){
                                         
                                         let dcClone = dcChildren[i].cloneNode(true);
                                                 albumBlock.querySelector('.album_audioBlock').appendChild(dcClone)
                                                                                 
                                             }
                                 }
                     
                                 let elemsAudio = e.target.closest(".albumBlock").querySelector(".album_audioBlock")
                                 
                                 if(elemsAudio.style.visibility == "hidden" || elemsAudio.style.visibility  == ""){
                                     elemsAudio.style.visibility = "visible";
                                     elemsAudio.style.display = "block";
                                     // initAudioPlayer(elemsAudio)
                                 }
                                 else{
                                     elemsAudio.style.visibility = "hidden";
                                     elemsAudio.style.display = "none";
                                     elemsAudio.replaceChildren()
                                 }
                         })
                                
                             
                             
                             //C:\Users\Вардан\Desktop\Google Расширения ПРИМЕР\новое\Последняя версия плеера\Chrome_extension_saver\popup.js
                             // Добавляем кнопку в элемент
                                         
                             albums_Block.appendChild(div);
                             
                         });
                     
 
                     if($("#albums_Block").css("visibility")=="visible"){
                         toHide($("#albums_Block"))
                     }
                     else if($("#albums_Block").css("visibility")=="hidden"){
                         toHide($("#dataContainer"))
                         toHide($("#createMyPlaylistWind"))
                         toVisible($("#albums_Block"))
 
                     }
                 })
 
                 
         // Отображаем данные в всплывающем окне
             jsonArray.forEach((item, index) => {
             
             let obj = parseJsonToObj(item)
             let div = makeAudioElem(obj)[0]
             
             // Создаем кнопку для удаления
             const deleteButton = div.querySelector('.delButt');
                
             deleteButton.addEventListener('click', (e) => {
                 // Удаляем элемент по индексу
                 jsonArray.splice(index, 1); // Удаляем элемент из массива
                 //let elem = e.target.closest('container-audio')
                 alert(e.target)
                 dataContainer.removeChild(e.target.closest(".container-audio"))
                 // Сохраняем обновленный массив в chrome.storage
                 chrome.storage.local.set({ jsonArray: jsonArray }, () => {
                     console.log(`Элемент "${item}" удален.`);
                     //updateUI(); // Обновляем интерфейс
                 });
             });
 
          //intoAlbom_butt
          let intoAlbom_butt = div.querySelector('.intoAlbom_butt');
          //Из раздела "Открыть плейлист", кнопка по нажатию которого показывает выпадающий список
          intoAlbom_butt.addEventListener("click",function(){
             albumArr = []
             jsonAlbumArray.forEach((item, index) => {
                 let obj = parseJsonToObj(item)
                 albumArr.push(obj.album)   
             })
             let selectBtn = make_dropdownList(albumArr)[0]
             let hasSelChild = div.querySelector(".selectAlb")
             //let selectBtn = div.querySelector('.selectAlb');
             
             if(hasSelChild){
                 //par.removeChild(selectElem)
                 //alert("deleted")
                 div.removeChild(div.querySelector(".selectAlb"))
             }
             else if(!hasSelChild){
                 div.appendChild(selectBtn)
                 //alert("added")
             }
            
 
             //выбор альбома и добавление песни в него
             selectBtn.addEventListener("click",function(e){
             e.target.addEventListener("change", function(){
                 let text = this.options[this.selectedIndex].text;
                 //let par = e.target.closest('.container-audio')
                 //par.setAttribute("album",text)
                 
                         
                         let songInfo = div.querySelector(".text").innerHTML.split(" - ")
                         let artistName = songInfo[0]
                         let songName = songInfo[1]
                         
                         
                         if(artistName==obj.artistName && songName==obj.songName){
                             obj.albumAudio = text
                             //console.log(dcChildren)
                             //selectText =obj.albumAudio
                             
                             let str = JSON.stringify(obj)
                             if(jsonArray.includes(item)){
                                 jsonArray.splice(index, 1);
                                 jsonArray.push(str) 
                             }
                             
                             chrome.storage.local.set({ jsonArray: jsonArray}, () => {});
                         }  
                         // selectBtn.style.visibility = "hidden"               
                      });
              })
             //  selectBtn.style.visibility = "hidden"       
             
     })
         
     
             //C:\Users\Вардан\Desktop\Google Расширения ПРИМЕР\новое\Последняя версия плеера\Chrome_extension_saver\popup.js
             // Добавляем кнопку в элемент
             div.setAttribute("album",obj.albumAudio)
             div.appendChild(deleteButton);
             dataContainer.appendChild(div);
             
         });
         
        
         // if (jsonArray.length === 0) {
         //     // Выводим сообщение, если данных нет
         //     dataContainer.textContent = "Нет данных";
         // }
         if(dataContainer.children.length>0){
 
             initAudioPlayer(dataContainer)
         }
     });
     
  
 
 //событие клика на окна для создания альбомов
 $(".open_createMyPlaylistButt_wind").on("click",function(e){
         
     if($("#createMyPlaylistWind").css("visibility")=="visible"){
         toHide($("#createMyPlaylistWind"))
     }
     else if($("#createMyPlaylistWind").css("visibility")=="hidden"){
         toHide($("#dataContainer"))
         toHide($("#albums_Block"))
         toVisible($("#createMyPlaylistWind"))
 
     }
 })
 
 
 //событие клика на открытии аудиоплеера
 $(".openPlaylistButt").on("click",function(e){
   
     if($("#dataContainer").css("visibility")=="visible"){
         toHide($("#dataContainer"))
         
     }
     else if($("#dataContainer").css("visibility")=="hidden"){
         toHide($("#createMyPlaylistWind"))
         toHide($("#albums_Block"))
         toVisible($("#dataContainer"))
     }
 })
   
 //Наружние функции
 
 //Получение объекта по названию альбома, для дальнейшей передачи в chrome.local.storege
 function getInfoForAlbum(albumName) {
     let obj = {}
     obj.album = albumName
     // obj.songs = arrSongs
     return obj
 }
 
 
 
 //функция для создания выпадающего списка с перечнем альбомов
    function make_dropdownList(arr){
     let array = []
         let select = document.createElement('select')
         select.classList.add("selectAlb")
         let option1 = document.createElement('option')
         option1.innerHTML = "Выберите альбом"
         // option1.selected = "true"
         // option1.disabled = "disabled"
         select.appendChild(option1)
 
         for(let i=0;i<arr.length;i++){
             let option = document.createElement('option')
             option.classList.add("optionAlb")
             option.value = arr[i]
             option.innerHTML = arr[i]
             select.appendChild(option)
         }
         array.push(select)
         return array
    }
 
         //Функция для создания аудиоэлемента. Из спарсенного json в виде объекта создаем аудиоэлемент
         function makeAudioElem(obj){
             let containerAudio = document.createElement('div')
             containerAudio.classList.add("container-audio")
             let songInfo = document.createElement('h2')
             songInfo.classList.add("text")
             songInfo.innerHTML = obj.artistName + " - " + obj.songName
             containerAudio.appendChild(songInfo)
             let mus_cont= document.createElement('div')
             mus_cont.classList.add("mus_cont")
             let audioEl = document.createElement('audio')
             audioEl.setAttribute("controls","")
             audioEl.src = obj.musicURL    
             audioEl.type = "audio/mp3"
             mus_cont.appendChild(audioEl)
             let delButt = document.createElement('button')
             delButt.classList.add("delButt")
             let intoAlbom_butt = document.createElement('button')
             intoAlbom_butt.classList.add("intoAlbom_butt")
             mus_cont.appendChild(delButt)
             //mus_cont.appendChild(intoAlbom_butt)
             containerAudio.appendChild(mus_cont)
             containerAudio.appendChild(intoAlbom_butt)
             //containerAudio.setAttribute("album","")
             let arr =[]
             arr.push(containerAudio)
             return arr
         }
 
     //функция создания альбома
         function createAlbum(name){
             let arr = []
             //<div class="albumBlock">
             let albumBlock = document.createElement('div')
             albumBlock.classList.add("albumBlock")
             let album = document.createElement('div')
             album.classList.add("album")
             let albumTitle = document.createElement('p')
             albumTitle.classList.add("albumTitle")
             if(typeof name === 'object'){
                 albumTitle.innerHTML = name.album
                 albumBlock.setAttribute("album",name.album)
             }
             if(typeof name === 'string'){
                 albumTitle.innerHTML = name
                 albumBlock.setAttribute("album",name)
             }
             //albumTitle.innerHTML = name
             album.appendChild(albumTitle)
             let album_ButtBlock = document.createElement('div')
             album_ButtBlock.classList.add("album_ButtBlock")
             let openAlbum = document.createElement('button')
             openAlbum.classList.add("openAlbum")
             let playAlbum = document.createElement('button')
             playAlbum.classList.add("playAlbum")
             let delAlbum = document.createElement('button')
             delAlbum.classList.add("delAlbum")
             album_ButtBlock.appendChild(openAlbum)
             album_ButtBlock.appendChild(playAlbum)
             album_ButtBlock.appendChild(delAlbum)
             album.appendChild(album_ButtBlock)
             let album_audioBlock = document.createElement('div')
             album_audioBlock.classList.add("album_audioBlock")
             albumBlock.appendChild(album)
             albumBlock.appendChild(album_audioBlock)
             
             arr.push(albumBlock)
             return arr
         }
 
     //логика воспроизведения аудио
      function initAudioPlayer(dataContainer) {
             // let audioElements = document.querySelectorAll('container-audio');
             let arr = dataContainer.querySelectorAll('.container-audio')
             
             arr.forEach(function(elem,ind) {
                 //console.log(ind+""+elem.querySelector('div.mus_cont>audio').src)
                 nextInd = ind+1
                 let currAudio = elem.querySelector('div.mus_cont>audio')
                 let nextAudio =  arr[nextInd].querySelector('div.mus_cont>audio')
                 currAudio.addEventListener('play',(e) => {
                     //console.log(arr[arr.length-1].closest(".container-audio").querySelector('.text').innerHTML)
                 for(let i =0;i<arr.length+1;i++){
                         if(arr[i].querySelector('div.mus_cont>audio')!==currAudio){
                             arr[i].querySelector('div.mus_cont>audio').pause()
                         }
                     }
                 })
             
                 currAudio.addEventListener('ended', () => {
                         nextAudio.play();
                     });
             
                 })
     }
 
     //Вспомогательные универсальные функции
     function toVisible(elem){
         elem.css("visibility","visible").css("display","block")
     }
     function toHide(elem){
         elem.css("visibility","hidden").css("display","none")
     }
      //парсинг приходящего json файла в объект
      function parseJsonToObj(json){
         let obj = JSON.parse(json)
         return obj
     }
 
 
 })
 