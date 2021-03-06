//1. Reder songs
//2. Scroll top
//3. Play/ pause/ seek
//4. CD rotate
//5. next preview   
//6. Random
//7. Next/ Repeat when ended
//8. active song
//9. scroll active song into view
//10. play song when click
const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);


const playList=$('.playlist');  
const heading=$('header h2');
const cdThumb=$('.cd-thumb');
const audio=$('#audio');
const cd=$('.cd');
const playBtn=$('.btn-toggle-play');
const player=$('.player');
const progress=$('.progress');
const btnNext=$('.btn-next');
const btnPrev=$('.btn-prev');
const btnRandom=$('.btn-random');
const btnRepeat=$('.btn-repeat');
const btnVolume=$('.btn-volume');
const btnVoluneUp=$('.btn-volume-up')
const btnVoluneMute=$('.btn-volume-mute')
const progressVolume=$('.progressVolume');

const app={
    currentIndex:0,
    preDurationAudio:0,
    isRandom: false,
    isRepeat: false,
    volumeAudio: 1,
    setConfig: function(key,value){
        window.localStorage.setItem(key,JSON.stringify(value));
    },
    getConfig: function(key){
        return JSON.parse(window.localStorage.getItem(key));
    },
    songs:[
        {
            name:'Nevada',
            singer:'Vicetone',
            path:'./assets/mussic/song1.mp3',
            image:'./assets/img/imgSong1.jpg'
        },
        {
            name:'Sugar',
            singer:'Maroon 5',
            path:'./assets/mussic/song2.mp3' ,
            image:'./assets/img/imgSong2.jpg'
        },
        {
            name:'Summertime',
            singer:'K391',
            path:'./assets/mussic/song3.mp3' ,
            image:'./assets/img/imgSong3.jpg'
        },
        { 
            name:'The Calling',
            singer:'TheFatRat Laura Brehm',
            path:'./assets/mussic/song4.mp3' ,
            image:'./assets/img/imgSong4.jpg'
        },
        { 
            name:'Reality',
            singer:'Lost Frequencies_ Janieck Devy',
            path:'./assets/mussic/song5.mp3' ,
            image:'./assets/img/imgSong5.jpg'
        },
        {
            name:'Ng??y Kh??c L???',
            singer:'Den',
            path:'./assets/mussic/song6.mp3' ,
            image:'./assets/img/imgSong6.jpg'
        },
        { 
            name:'My Love',
            singer:'Westlife',
            path:'./assets/mussic/song7.mp3' ,
            image:'./assets/img/imgSong7.jpg'
        },
        {  
            name:'Monsters',
            singer:'Katie Sky',
            path:'./assets/mussic/song8.mp3' ,
            image:'./assets/img/imgSong8.jpg'
        },
        { 
            name:'Lemon Tree',
            singer:'Fools Garden',
            path:'./assets/mussic/song9.mp3' ,
            image:'./assets/img/imgSong9.jpg'
        }, 
        {
            name:'Attention',
            singer:'Charlie Puth',
            path:'./assets/mussic/song10.mp3' ,
            image:'./assets/img/imgSong10.jpg'
        }
    ],
    render: function(){
        const html=this.songs.map(function(song,index){
            return `<div class="song" data-index='${index}'>
            <div class="thumb" style="background-image: url('${song.image}')" >
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            <ul class="option_list hiden">
                <li class="option_list-choose btn-delete">X??a</li>
                <li class="option_list-choose btn-prioritize">??u ti??n</li>
            </ul>
            </div>
          </div>`
        });
        playList.innerHTML=html.join('');
    },
    defineProperties:function(){
        Object.defineProperty(this,'currentSong',{  
            get:function(){
                return this.songs[ app.currentIndex];
            }
        })
    },
    scrollToActiveSong:function(){
        setTimeout(function(){
            $('.song.active').scrollIntoView({
                behavior :'smooth',
                block:'nearest'
            }); 
        },200)
    }, 
    loadCurrentSong:function(){ 
        playList.querySelectorAll('.song')[app.currentIndex].classList.add('active');
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage=`url(${this.currentSong.image})`;
        audio.src=this.currentSong.path;
    },
    handleEvent: function(){
        let cdWidth=cd.offsetWidth;
        let cdPlayList=playList.offsetWidth;

        //x??? l?? cd quay v?? d???ng
        const cdThumbAnimate=cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ],{
            duration:10000,
            iterations:Infinity
        })
        cdThumbAnimate.pause();
        
        let browserHeight=$('.player').offsetHeight;
        // x??? l?? khi k??o thanh ch???a nh???c
        playList.onscroll=function(){
            const scrollTop=playList.scrollTop;
            const newCdWidth=cdWidth - scrollTop;
            cd.style.width=newCdWidth > 0 ? newCdWidth +'px':'0px';
            playList.style.height=browserHeight-cd.offsetWidth + 'px';
            cd.style.opacity=newCdWidth / cdWidth;  
        }

        
        
        // x??? l?? khi nh???n n??t play
        playBtn.onclick=function(){
             if (player.classList.toggle('playing')){
                audio.play();
             } else {
                audio.pause();
            }   
        }

        // khi ti???n ????? khi b??i h??t thay ?????i
        audio.ontimeupdate=function(){
            progress.value=audio.currentTime*100/audio.duration;
            if(!audio.paused) {
                cdThumbAnimate.play();
                app.setConfig('currentIndex',app.currentIndex);
                app.setConfig('preDurationAudio',audio.currentTime);
                }
        }
        
        //x??? l?? khi k??o thanh propress
        progress.oninput = function(){
            audio.currentTime=Math.floor((this.value / 100)*audio.duration); 
        }
        
        //khi ti???n kh??ng ph??t
        audio.onpause=function(){
            cdThumbAnimate.pause();
        }

        //khi nh???n v??o nut next
        btnNext.onclick=function(){
            // khi nh???n v??o n??t next x??a active c???a random
            // btnNext.classList.add("active");
            // setTimeout(function(){
            //     btnNext.classList.remove("active");
            // },300) //qua b??n file main.css x??t active

            //ki???m tra n???u c?? random th?? next c??ng random
            if (app.isRandom){
                app.currentIndex=app.currentIndexRandom();
            }


            //tai bai hat tiep theo
            app.nextSong();
            app.removeActiveSongPrev()
            app.loadCurrentSong();
            app.playWhenChangeSong();
            app.scrollToActiveSong()
        }

        //khi nhan vao nut preview 
        btnPrev.onclick = function(){
            // // khi nh???n v??o n??t preview nh??y active
            // btnPrev.classList.add("active");
            // setTimeout(function(){
            //     btnPrev.classList.remove("active");
            // },500) //qua b??n file main.css x??t active

            //ki???m tra n???u c?? random th?? preview c??ng random
            if (app.isRandom){
                app.currentIndex=app.currentIndexRandom();
            }

            app.preSong();
            app.removeActiveSongPrev()
            app.loadCurrentSong();
            app.playWhenChangeSong();
            app.scrollToActiveSong()
        }

        //x??? l?? khi k???t th??c b??i h??t 
        audio.onended =function(){
            app.nextWhenEnded();
            app.removeActiveSongPrev()
            app.loadCurrentSong();
            app.playWhenChangeSong();
            app.scrollToActiveSong()
        }

        //Khi nh???n v??o n??t random
        btnRandom.onclick=function(){
            app.randomSong();
        }

        //Khi nh???n v??o n??t repeat
        btnRepeat.onclick=function(){
            app.repeat();
        }

        // s??? l?? khi click ch???n b??i   
        playList.onclick=function(event){
            if (event.target.closest('.song') && !event.target.closest('.option')){
                if (audio.paused && event.target.closest('.song').classList.contains('active')){
                        app.playWhenChangeSong();
                } else if (!event.target.closest('.song').classList.contains('active')) {
                    app.currentIndex=Number.parseInt(event.target.closest('.song').dataset.index);
                    app.removeActiveSongPrev();
                    app.loadCurrentSong();
                    app.playWhenChangeSong();
                }
            }
        }
        
        //s??? l?? khi ch???n option
        const options=playList.querySelectorAll('.option');
        options.forEach(function(option){
            //x??? l?? click option
            option.onclick=function(event){
                //x??? l?? khi hi???n option
                if ( playList.querySelector('.option_list:not(.hiden)')){
                    if (option.querySelector('.option_list')!=playList.querySelector('.option_list:not(.hiden)')){
                        playList.querySelector('.option_list:not(.hiden)').classList.add('hiden');
                    }
                }
                option.querySelector('.option_list').classList.toggle('hiden');
                playList.addEventListener('scroll',
                function(){
                    option.querySelector('.option_list').classList.add('hiden');
                })
                document.onclick=function(e){
                    if (!e.target.closest('.option_list') && !e.target.closest('.option')) {
                        option.querySelector('.option_list').classList.add('hiden');
                    }    
                }
                event.stopPropagation();
            }
        });

        //x??? l?? khi nh???n n??t x??a


        //x??a s??? ki???n n???i b???t
        progressVolume.onclick=function(e) {
            e.stopPropagation();
        }
        //x??? l?? nhi nh???n v??o ??m thanh 
        btnVolume.onclick=function(event){
            event.stopPropagation();
            progressVolume.classList.toggle('hiden');
        }
        document.addEventListener('click',function(){
            progressVolume.classList.add('hiden');
        })
        playList.addEventListener('scroll',function(){
            progressVolume.classList.add('hiden');
        })
        //s??? l?? khi kh??o ??m thanh
        progressVolume.oninput=function(){
            if (progressVolume.value==0){
                btnVoluneMute.classList.remove('hiden');
                btnVoluneUp.classList.add('hiden');
            } else {
                btnVoluneUp.classList.remove('hiden');
                btnVoluneMute.classList.add('hiden');
            }
            audio.volume=progressVolume.value/100;
            app.setConfig('volumeAudio',audio.volume);
        }

    },
    loadConfig: function(){
        app.isRandom=app.getConfig('isRandom');
        btnRandom.classList.toggle('active',app.isRandom);
        app.isRepeat=app.getConfig('isRepeat');
        btnRepeat.classList.toggle('active',app.isRepeat);

        app.currentIndex=app.getConfig('currentIndex') || app.currentIndex;
        audio.currentTime=app.getConfig('preDurationAudio') || 0;
        audio.volume=app.getConfig('volumeAudio') || 1;
        progressVolume.value=audio.volume*100;
    },
    playWhenChangeSong:function(){
        player.classList.add("playing");
        audio.play();
    },
    
    nextSong:function(){
        if (app.currentIndex + 1 < app.songs.length){
            app.currentIndex++;
        } else {
            app.currentIndex=0;
        }    
    },
    preSong:function(){
        if(app.currentIndex-1>=0){
            app.currentIndex--;
        }else{
            app.currentIndex=app.songs.length-1;
        } 
    },
    randomSong: function(){
        btnRandom.classList.toggle('active');
        app.isRandom=!app.isRandom;
        app.setConfig('isRandom',app.isRandom);
        if (app.isRepeat){
            btnRepeat.classList.remove('active');
            app.isRepeat=!app.isRepeat;
            app.setConfig('isRepeat',app.isRepeat);
        }
    },
    repeat: function(){
        btnRepeat.classList.toggle('active');
        app.isRepeat=!app.isRepeat;
        app.setConfig('isRepeat',app.isRepeat);
        if (app.isRandom){
            btnRandom.classList.remove('active');
            app.isRandom=!app.isRandom;
            app.setConfig('isRandom',app.isRandom);
        }
    },
    currentIndexRandom: function(){
        let tempCurrentIndex;
        do {
            tempCurrentIndex=Number.parseInt(Math.random()*(app.songs.length+1))
        } while ( this.currentIndex == tempCurrentIndex)
        return tempCurrentIndex;
    },
    nextWhenEnded: function(){
        if (app.isRandom){
            app.currentIndex=app.currentIndexRandom();
        } else if (app.isRepeat){
            app.currentIndex--;
        }
        if (app.currentIndex + 1 < app.songs.length){
            app.currentIndex++;
        } else {
            app.currentIndex=0;
        }
    },
    removeActiveSongPrev: function(){
        playList.querySelector('.active').classList.remove('active');
    },
    start:function(){
       
        //load config
        app.loadConfig();

        //render danh s??ch b??i h??t
        this.render();
        // ?????nh ngh??a c??c thu???c t??nh cho object
        this.defineProperties();

        //T???i b??i h??t ?????u ti??n
        this.loadCurrentSong();

        //L???ng nghe/ x??? l??
        this.handleEvent();

       
    }
}
app.start();