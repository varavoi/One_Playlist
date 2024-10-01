$(document).ready(function() {
const dataContainer = document.getElementById('dataContainer');
    dataContainer.style.display="none"
    let albumArr = []
// Считываем данные из chrome.storage
chrome.storage.local.get(['jsonArray'], (result) => {
    const jsonArray = result.jsonArray || []; // Если нет, создаем пустой массив

    // Отображаем данные в всплывающем окне
    jsonArray.forEach((item, index) => {
        
        let obj = parseJsonToObj(item)
        let div = makeAudioElem(obj)[0]
        // Создаем кнопку для удаления
        const deleteButton = div.querySelector('.delButt');
           
        deleteButton.addEventListener('click', () => {
            // Удаляем элемент по индексу
            jsonArray.splice(index, 1); // Удаляем элемент из массива

            // Сохраняем обновленный массив в chrome.storage
            chrome.storage.local.set({ jsonArray: jsonArray }, () => {
                console.log(`Элемент "${item}" удален.`);
                //updateUI(); // Обновляем интерфейс
            });
        });

        // Добавляем кнопку в элемент

        div.appendChild(deleteButton);
        dataContainer.appendChild(div);
    });

    if (jsonArray.length === 0) {
        // Выводим сообщение, если данных нет
        dataContainer.textContent = "Нет данных";
    }
});

// Функция для обновления интерфейса
function updateUI() {
    dataContainer.innerHTML = ''; // Очищаем предыдущий контент
    chrome.storage.local.get(['jsonArray'], (result) => {
        const jsonArray = result.jsonArray || []; // Если нет, создаем пустой массив

        // Отображаем обновленные данные
        jsonArray.forEach((item, index) => {
           
            let obj = parseJsonToObj(item)
            let div = makeAudioElem(obj)[0]
            // Создаем кнопку для удаления
            const deleteButton = div.querySelector('.delButt');
            
            deleteButton.addEventListener('click', () => {
                // Удаляем элемент по индексу
                jsonArray.splice(index, 1);

                // Сохраняем обновленный массив в chrome.storage
                chrome.storage.local.set({ jsonArray: jsonArray }, () => {
                    console.log(`Элемент "${item}" удален.`);
                    updateUI(); // Обновляем интерфейс
                });
            });

            // Добавляем кнопку в элемент
            div.appendChild(deleteButton);
            dataContainer.appendChild(div);
        });

        if (jsonArray.length === 0) {
            dataContainer.textContent = "Нет данных"; // Если данных нет
        }
    });
}






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

//событие клика на окна для просмотра альбомов
$(".open_albumsButt").on("click",function(e){
      
    if($("#albums_Block").css("visibility")=="visible"){
        toHide($("#albums_Block"))
    }
    else if($("#albums_Block").css("visibility")=="hidden"){
        toHide($("#dataContainer"))
        toHide($("#createMyPlaylistWind"))
        toVisible($("#albums_Block"))

    }
})

  
  //событие клика на создания нового альбома
  $(".createMyPlaylistButt").on("click",function(e){
    let nameAlbum = document.querySelector("#nameAlbum").value
    let album = createAlbum(nameAlbum)[0]
    let albums_Block = document.querySelector("#albums_Block")
    albums_Block.appendChild(album)
    albumArr.push(nameAlbum)
    alert(`Альбом ${nameAlbum} успешно создан`)
})
   
//событие клика на удаления альбома
$("#albums_Block").on("click",function(e){
    //let albums_Block = document.querySelector("#albums_Block")
    
    if(e.target.className=="delAlbum"){
        //alert(e.target)
        let nameAlbum = e.target.closest(".albumBlock").querySelector(".albumTitle").innerHTML
        document.querySelector("#albums_Block").removeChild(e.target.closest(".albumBlock"))
       
        alert(`Альбом ${nameAlbum} успешно удален`)
    }
       
    })

    $("#dataContainer").on("click",function(e){
        //событие добавления музыки в альбом
       if(e.target.className === "intoAlbom_butt"){
           let par = e.target.closest('.container-audio')
           
           let selectElem = make_dropdownList(albumArr)[0]
           let hasSelChild = par.querySelector(".selectAlb")
          
           if(hasSelChild){
              //par.removeChild(selectElem)
               //alert("deleted")
               par.removeChild(par.querySelector(".selectAlb"))
           }
           else if(!hasSelChild){
               par.appendChild(selectElem)
               //alert("added")
           }
           
       }
       
       if(e.target.className === "selectAlb"){
           e.target.addEventListener("change", function(){
               let text = this.options[this.selectedIndex].text;
               let par = e.target.closest('.container-audio')
               par.setAttribute("album",text)
               let albums_Block_childrens = document.querySelector("#albums_Block").childNodes
               albums_Block_childrens.forEach(item=>{
                   if(item.className=="albumBlock"){
                       let parClone = par.cloneNode(true);
                       item.appendChild(parClone)
                   }
               })
             });
       }
       
   })


    function make_dropdownList(arr){
        let array = []
            let select = document.createElement('select')
            select.classList.add("selectAlb")
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

})