$(document).ready(function() {
$("div[class='track-b']").css("background","red");

$("div[class='track-b']").html((index, oldHtml)=>{
       return oldHtml + "<button class = 'addBtn' title='Добавить в свой плейлист'></button>"
    })


})
