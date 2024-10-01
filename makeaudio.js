//из спарсенного json в виде объекта создаем аудиоэлемент
function makeAudioElem(obj){
    let containerAudio = document.createElement('div')
    containerAudio.classList.add("container-audio")
    let songInfo = document.createElement('h2')
    songInfo.classList.add("text")
    songInfo.innerHTML = obj.artistName + " - " + obj.songName
    containerAudio.appendChild(songInfo)
    let mus_cont= document.createElement('div')
    mus_cont.classList.add("mus_cont")
    let audioEl = document.createElement('audio')
    audioEl.setAttribute("controls","")
    audioEl.src = obj.musicURL    
    audioEl.type = "audio/mp3"
    mus_cont.appendChild(audioEl)
    let delButt = document.createElement('button')
    delButt.classList.add("delButt")
    let intoAlbom_butt = document.createElement('button')
    intoAlbom_butt.classList.add("intoAlbom_butt")
    mus_cont.appendChild(delButt)
    //mus_cont.appendChild(intoAlbom_butt)
    containerAudio.appendChild(mus_cont)
    containerAudio.appendChild(intoAlbom_butt)
    containerAudio.setAttribute("album","11")
    let arr =[]
    arr.push(containerAudio)
    return arr
}