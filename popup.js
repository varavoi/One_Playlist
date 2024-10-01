$(document).ready(function() {
const dataContainer = document.getElementById('dataContainer');

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




function parseJsonToObj(json){
    let obj = JSON.parse(json)
    return obj
}

function toVisible(elem){
    elem.css("visibility","visible").css("display","block")
}
function toHide(elem){
    elem.css("visibility","hidden").css("display","none")
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




})