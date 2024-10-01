$(document).ready(function() {
    $("div[class='track-b']").css("background", "#9cddf7").css("border-radius", "10px").css("margin", "10px");

    $("div[class='track-b']").html((index, oldHtml) => {
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
        let songName = e.closest(".track-b").find(".track-b-wrap>a[class='name']").html()
        let artistName = e.closest(".track-b").find(".track-b-wrap>a[class='singer']").html()
        let st = e.closest('.track-b').find('.track-b-play').attr('data-url')

        let st2 = 'https://tetamuz.online'

        src = st2 + st
        let musicURL = src

        let obj = {}
        obj.songName = songName.trim()
        obj.artistName = artistName.trim()
        obj.musicURL = musicURL
        console.log(`songName = ${songName.trim()}\n artistName = ${artistName.trim()}\n`)
        return obj
    }

    //https://tetamuz.online/files/p-555268/aec48a883aae21ec3905aa101156dadba19e5253d49ef205a11133d6a2dc93b14a482c
    $(".addBtn").on("click", function(e) {
        let songObj = getInfoFromClick($(this))
        addToJsonArray(songObj)
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