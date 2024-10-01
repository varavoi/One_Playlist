$(document).ready(function() {
    $("td[class='artist-title']").closest("tr").css("background", "#9cddf7").css("border-radius", "10px").css("margin", "10px");

    $("td[class='artist-title']").html((index, oldHtml) => {
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
        let songInfo = e.closest(".item-song").find("td[class^='play']").attr("data-title").split(" - ")
        let songName = songInfo[1]
        let artistName = songInfo[0]
        let musicURL = "https://rux.muzmo.cc" + e.closest(".item-song").find("td[class^='play']").attr("data-file")


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