$(document).ready(function() {
$("td[class='artist-title']").closest("tr").css("background","red");

$("td[class='artist-title']").html((index, oldHtml)=>{
       return oldHtml + "<button class = 'addBtn' title='Добавить в свой плейлист'></button>"
    })

   //alert(songName+" " + artistName)
window.globalJsonArray = [];

function addToJsonArray(obj){
    chrome.storage.local.get(['jsonArray'],(result)=>{
        const jsonArray = result.jsonArray || [];
        const jsonString = JSON.stringify(obj)
        jsonArray.push(jsonString)
   
    chrome.storage.local.set({jsonArray},()=>{
        console.log("Добавлен в ", jsonString)
        })
    })
}
function getInfoFromClick(e){
    let songInfo= e.closest(".item-song").find("td[class^='play']").attr("data-title").split(" - ")
    let songName = songInfo[1]
    let artistName = songInfo[0]
    let musicURL="https://rux.muzmo.cc"+e.closest(".item-song").find("td[class^='play']").attr("data-file")
    let songTime = e.closest(".track-b").find("div[class = 'track-b-duration']").html()
    let a = songName+" "+artistName+" "+songTime
    //alert(songName)
    let obj = {}
    obj.songName= songName
    obj.artistName= artistName
    obj.songTime= songTime
    obj.musicURL = musicURL
    return obj
}
function getCurrentAudioLink() {
    chrome.storage.local.get(['currentAudioLink'], function(result) {
        if (result.currentAudioLink) {
            console.log('Текущая аудиосссылка из хранилища:', result.currentAudioLink);
            // Здесь вы можете взаимодействовать с этой ссылкой как хотите
            let currentAudioLink = result.currentAudioLink;
            // Например, использовать текущую ссылку для дальнейших действий
        } else {
            console.log('Аудиосссылка не найдена.');
        }
    });
}


$(".addBtn").on("click",function(e){
    let songObj =  getInfoFromClick($(this))
    addToJsonArray(songObj)
    
    //alert(json)
})
$(".track-b-play").on("click",function(e){
    getCurrentAudioLink();
    // Вызов функции получения аудиоссылки
})

})
