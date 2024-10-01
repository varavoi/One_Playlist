$(document).ready(function() {
    $(".track__info").css("background", "#9cddf7").css("border-radius", "10px").css("margin", "10px");

    $(".track__info").html((index, oldHtml) => {
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
        let songName = e.closest("div[class='track__info']").find(".track__title").html()
        let artistName = e.closest("div[class='track__info']").find(".track__desc").html()
        let tmp_str = e.closest("li[class^='tracks__item']").attr("data-musmeta")
        let first_pos = tmp_str.indexOf('url') + 6;
        let last_pos = tmp_str.indexOf('mp3') + 3;
        let tmp_musicURL = tmp_str.substr(first_pos, last_pos - first_pos).replace(/\\\//g, '/');
        let musicURL = tmp_musicURL



        let obj = {}
        obj.songName = songName.trim()
        obj.artistName = artistName.trim()
        console.log(`songName = ${obj.songName.trim()}\n artistName = ${obj.artistName.trim()}\n`)
        obj.musicURL = musicURL
        return obj
    }



    $(".addBtn").on("click", function(e) {
        let songObj = getInfoFromClick($(this))
        addToJsonArray(songObj)
        //alert(`Песня ${obj.artistName} - ${obj.songName} добавилась в плеер`)
        alert(`Песня ${songObj.artistName} - ${songObj.songName} добавилась в плеер`)
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