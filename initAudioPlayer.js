 //логика воспроизведения аудио
 function initAudioPlayer(dataContainer) {
    // let audioElements = document.querySelectorAll('container-audio');
    let arr = dataContainer.querySelectorAll('.container-audio')
     arr.forEach(function(elem,ind) {
         console.log(ind+""+elem.querySelector('div.mus_cont>audio').src)
        
         nextInd = ind+1
         //let st = querySelector('div.mus_cont>audio')
         let currAudio = elem.querySelector('div.mus_cont>audio')
         let nextAudio =  arr[nextInd].querySelector('div.mus_cont>audio')
         currAudio.addEventListener('play',(e) => {
            //alert(currAudio.closest(".container-audio").getAttribute("album"))
             arr.forEach(function(elem2,ind) {
                 if(elem2.querySelector('div.mus_cont>audio')!==currAudio){
                     elem2.querySelector('div.mus_cont>audio').pause()
                 }
             })
         })
     
         currAudio.addEventListener('ended', () => {
                 nextAudio.play();
             });
      })
 }