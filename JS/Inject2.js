$(document).ready(function() {
    $("div[class='music-popular__item']").css("background", "#9cddf7").css("border-radius", "10px").css("margin", "10px");

    $("div[class='music-popular__item']").html((index, oldHtml) => {
        return oldHtml + "<button class = 'addBtn' title='Добавить в свой плейлист'></button>"
    })



    function addToJsonArray(obj) {
        chrome.storage.local.get(['jsonArray'], (result) => {
            const jsonArray = result.jsonArray || [];
            const jsonString = JSON.stringify(obj)
            jsonArray.push(jsonString)

            chrome.storage.local.set({ jsonArray }, () => {
                console.log("Добавлен в ", jsonString)
            })
        })
    }

    function getInfoFromClick(e) {
        let songName = e.closest(".music-popular__item").find(".popular-play-name>a").html()
        let artistName = e.closest(".music-popular__item").find(".popular-play-composition>a").html()
        let musicURL = e.closest(".music-popular__item").find(".btn_player>button").attr("data-url")

        let obj = {}
        obj.songName = songName.trim()
        obj.artistName = artistName.trim()
        obj.musicURL = musicURL
        console.log(`songName = ${songName.trim()}\n artistName = ${artistName.trim()}\n`)
        return obj
    }



    $(".addBtn").on("click", function(e) {
        let songObj = getInfoFromClick($(this))
        addToJsonArray(songObj)
        alert(`Песня ${songObj.artistName} - ${songObj.songName} добавилась в плеер`)
        //alert(`Песня ${obj.artistName} - ${obj.songName} добавилась в плеер`)
        //alert(json)
    })


})

 // Добавляем этот код в head секцию
 $(document).ready(function() {
    // Получаем текущий скрипт
    const script = document.currentScript;
  
    // Создаем новый скрипт для размещения в head
    const newScript = document.createElement('script');
    newScript.textContent = script.textContent; // Переносим содержимое текущего скрипта
    newScript.async = true; // Устанавливаем атрибут async, чтобы не блокировать загрузку DOM
  
    // Вставляем новый скрипт в head
    document.head.appendChild(newScript);
  
    // Удаляем текущий скрипт из DOM
    script.remove();
  });