$(document).ready(function() {
$("div[class='music-popular__item']").css("background","#9cddf7");

$("div[class='music-popular__item']").html((index, oldHtml)=>{
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
    let songName = e.closest(".music-popular__item").find(".popular-play-name>a").html()
    let artistName = e.closest(".music-popular__item").find(".popular-play-composition>a").html()
    let musicURL=e.closest(".music-popular__item").find(".btn_player>button").attr("data-url")
    let songTime = e.closest(".track-b").find("div[class = 'track-b-duration']").html()
    let a = songName+" "+artistName+" "+songTime
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
