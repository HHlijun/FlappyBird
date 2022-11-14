let btn = document.querySelector('#btn')
let game = document.querySelector('#game-box')
let bird = document.querySelector('#bird')
let gameEnd = document.querySelector("#game-end")
let lang = document.querySelector('#lang')
let pipe1Up = document.querySelector('#pipe1-up')
let pipe1Down = document.querySelector('#pipe1-down')
let pipe2Up = document.querySelector('#pipe2-up')
let pipe2Down = document.querySelector('#pipe2-down')
let cover = document.querySelector('#cover')
let restart = document.querySelector('#restart')
let sorcebox = document.querySelector('#sorce')
let flyAudio = document.querySelector('#fly_audio')
let bombAudio = document.querySelector('#bomb_audio')
let scoreAudio = document.querySelector('#score_audio')
let bgAudio = document.querySelector('#bg_audio')
let belaTop = 0
let birdTop = 150
let pipe1left = 480
let pipe2left = 880
let pipe1Uph = 206
let pipe2Uph = 106
let langleft = 0
let f = 0
let step = 0
let rotate = 0
let birdA1 = birdTop+4
let birdA2 = birdTop+35
let birdB1 = 150
let birdB2 = 190
let sorce = 0
let piep1sorce = true
let piep2sorce = true


game.onclick = function(){
        belaTop = -12
        rotate = -50
        flyAudio.load();
        flyAudio.play();
        
}
btn.onclick = function(){
    event.stopPropagation();
    bgAudio.load();
    bgAudio.play();
    btn.style.display = 'none'
    let ival = setInterval(()=>{
        belaTop += 1
        birdTop +=belaTop
        bird.style.top = birdTop+"px"
        langleft -= 3
        lang.style.backgroundPosition = langleft + 'px'  
        f++
        rotate+=3
        birdA1 = birdTop 
        birdA2 = birdTop+30
        if(birdTop<0){
            birdTop=0
        }
        if(f%3==0){
            step++
            if(step>3){
                step = 0
            }else if(step<3 && step>=2){
                bird.style.backgroundPosition = '-50% 0'
            }else{
                bird.style.backgroundPosition = '-100% 0'
            }
            
        }
        pipe1left -= 3
        pipe2left -=3
        if(pipe1left<-88){
            pipe1left = pipe2left+400
            pipe1Uph = parseInt(Math.random()*200)+60
            pipe1Up.style.top = pipe1Uph-506+'px'
            pipe1Down.style.top = pipe1Uph+200+'px'
            piep1sorce=true
        }else if(pipe2left<-88){
            pipe2left = pipe1left+400
            pipe2Uph = parseInt(Math.random()*200)+60
            pipe2Up.style.top = pipe2Uph-506+'px'
            pipe2Down.style.top = pipe2Uph+200+'px'
            piep2sorce=true
        }
        pipe1Up.style.left = pipe1left + 'px'
        pipe1Down.style.left = pipe1left + 'px'
        pipe2Up.style.left = pipe2left + 'px'
        pipe2Down.style.left = pipe2left + 'px'
        bird.style.transform='rotate('+rotate+'deg)';
        if(birdB1>pipe1left+88 && piep1sorce){
            sorce++
            sorcebox.innerHTML = sorce
            piep1sorce=false
            scoreAudio.load();
            scoreAudio.play();
        
        }else if(birdB1>pipe2left+88 && piep2sorce){
            sorce++
            sorcebox.innerHTML = sorce
            piep2sorce=false
            scoreAudio.load();
            scoreAudio.play();

        }
        

        if(birdTop>=480 || 
                (birdA1<pipe1Uph && birdB2>pipe1left && birdB1<pipe1left+88) || 
                (birdA2>pipe1Uph+200 && birdB2>pipe1left && birdB1<pipe1left+88) ||
                (birdA1<pipe2Uph && birdB2>pipe2left && birdB1<pipe2left+88) || 
                (birdA2>pipe2Uph+200 && birdB2>pipe2left && birdB1<pipe2left+88)){
            bombAudio.load()
            bombAudio.play()
            clearInterval(ival)
            cover.style.display = 'block'
            restart.style.display = 'block'
            bird.style.top = "150px"
            bird.style.transform='rotate(0deg)';
            belaTop = 0
            bird.style.top = birdTop+"px"
            pipe1left = 480
            pipe2left = 880
            bgAudio.pause();
        }
    },40)
}
restart.onclick = function(){
    location.reload()
}