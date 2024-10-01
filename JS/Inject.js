$(document).ready(function() {
$("div[class='track-b']").css("background","red");

$("div[class='track-b']").html((index, oldHtml)=>{
       return oldHtml + "<button class = 'addBtn' title='Добавить в свой плейлист'></button>"
    })

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
        let songName = e.closest(".track-b").find(".track-b-wrap>a[class='name']").html()
        let artistName = e.closest(".track-b").find(".track-b-wrap>a[class='singer']").html()
        let songTime = e.closest(".track-b").find("div[class = 'track-b-duration']").html()
        let a = songName+" "+artistName+" "+songTime
        let obj = {}
        obj.songName= songName
        obj.artistName= artistName
        obj.songTime= songTime
        return obj
    }
    
    $(".addBtn").on("click",function(e){
        let songObj =  getInfoFromClick($(this))
        addToJsonArray(songObj)
        //alert(json)
    })
    
})
