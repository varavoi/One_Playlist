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