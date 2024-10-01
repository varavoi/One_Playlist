//функция создания альбома
function createAlbum(name){
    let arr = []
    //<div class="albumBlock">
    let albumBlock = document.createElement('div')
    albumBlock.classList.add("albumBlock")
    let album = document.createElement('div')
    album.classList.add("album")
    let albumTitle = document.createElement('p')
    albumTitle.classList.add("albumTitle")
    if(typeof name === 'object'){
        albumTitle.innerHTML = name.album
        albumBlock.setAttribute("album",name.album)
    }
    if(typeof name === 'string'){
        albumTitle.innerHTML = name
        albumBlock.setAttribute("album",name)
    }
    //albumTitle.innerHTML = name
    album.appendChild(albumTitle)
    let album_ButtBlock = document.createElement('div')
    album_ButtBlock.classList.add("album_ButtBlock")
    let openAlbum = document.createElement('button')
    openAlbum.classList.add("openAlbum")
    let playAlbum = document.createElement('button')
    playAlbum.classList.add("playAlbum")
    let delAlbum = document.createElement('button')
    delAlbum.classList.add("delAlbum")
    album_ButtBlock.appendChild(openAlbum)
    album_ButtBlock.appendChild(playAlbum)
    album_ButtBlock.appendChild(delAlbum)
    album.appendChild(album_ButtBlock)
    let album_audioBlock = document.createElement('div')
    album_audioBlock.classList.add("album_audioBlock")
    albumBlock.appendChild(album)
    albumBlock.appendChild(album_audioBlock)
    
    arr.push(albumBlock)
    return arr
}