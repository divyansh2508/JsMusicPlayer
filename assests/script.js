var userCalledPlay = false;
var skipPlay = 0,skipcount=0;
var currentCarsouelNumber = 0;
document.addEventListener('DOMContentLoaded',function(){
    write();
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems,{
        onCycleTo: function(data){
            var d = data.lastChild.currentSrc;
            var final =d.substr(d.lastIndexOf('/')+1);
            index$ = imgAddr.indexOf(final);
            currentCarsouelNumber = index$;
            console.log(index$);
            if(skipPlay==skipcount){
                Play(index$);
            }
            else{
                skipcount++;
            }
        }
    });
 });
document.addEventListener('DOMContentLoaded', function() {
});

var isLowerShowing = false;
function toggleLowerShow(){
    if(isLowerShowing){
        //make it not show
        isLowerShowing=false
    }
    else{
        isLowerShowing=true
    }
    document.querySelector('.c-lower').classList.toggle('show');
}
function write(){
    var ul = document.querySelector('.lolapil');
    var temp = '';
    var car = '';
    for(var i=0;i<19;i++){
        var songImage = songFI[songNames[i]][0];
        var artistImage = songFI[songNames[i]][1];
        var li = '<li><div class="collapsible-header c-bold"><b>'+songNames[i]+' | '+songArtistName[i]+'</b></div><div class="collapsible-body c-margin"><div class="row"><div class="col s6"><span class="c-out-image "><img src="./assests/songs/'+songImage+'.jpg" class="c-in-image" alt="'+songImage+'.jpg"></span><div class="c-artist-image" style=\'background-image: url("./assests/songs/ArtistImages/'+artistImage+'.jpg");\'></div></div><div class="col s6"><a class="waves-effect waves-light btn" onclick="userPlay('+i+')">Play</a></div></div></div></li>';
        var c = '<div class="carousel-item"><img src="./assests/songs/'+songImage+'.jpg" alt=""></div>';
        car+=c;
        temp+=li;
    }
    ul.innerHTML = temp;
    document.querySelector('.c-carousel-css').innerHTML = car;
    // <div class="carousel-item"><img src="./assests/songs/afterglow.jpg" alt=""></div>
}
var songNames = [
    'Afterglow',
    'At my worst',
    'Beach House',
    'Close',
    'Good Dayz',
    'Heartless',
    'Icy',
    'Intentions',
    'Lover',
    'Monster',
    'Out of my hands',
    'Red',
    'Strawberries & Siggarettes',
    'Sunflower',
    'Udd Gaye',
    'Willow',
    'Without you',
    'Wonder',
    'You broke me first'
]

var songArtistName = [
    'Ed Sheeran',
    'Pink Sweat$',
    'The Chainsmokers',
    'Nick Jonas',
    'SZA',
    'The Weeknd',
    'Pink Sweat$',
    'Justin Bieber',
    'Taylor Swift',
    'Shawn Mendes',
    'Shy Martin',
    'Taylor Swift',
    'Troye Sivan',
    'Post Malone',
    'Ritviz',
    'Taylor Swift',
    'The Kid LAORI',
    'Shawn Mendes',
    'Tate McRee'
]

var songFI = {
    'Afterglow' : ['afterglow','ed-sheeran'],
    'At my worst':['at-my-worst','pink-sweat'],
    'Beach House':['beach-house','chain-smokers'],
    'Close':['close','nick-jonas'],
    'Good Dayz':['good-dayz','sza'],
    'Heartless':['heartless','the-weeknd'],
    'Icy':['icy','pink-sweat'],
    'Intentions':['intentions','justin-b'],
    'Lover':['lover','taylor-swift'],
    'Monster':['monster','shawn-mendes'],
    'Out of my hands':['out-of-my-hands','shy-martin'],
    'Red':['red','taylor-swift'],
    'Strawberries & Siggarettes':['strawberry-and-ciggerates','troye-sivan'],
    'Sunflower':['sunflower','post-malone'],
    'Udd Gaye':['udd-gaye','ritviz'],
    'Willow':['willow','taylor-swift'],
    'Without you':['without-you','the-kid-laori'],
    'Wonder':['wonder','shawn-mendes'],
    'You broke me first':['you-broke-me-first','tate-mcree']
}

var songAddr = ['afterglow.mp3','at-my-worst.mp3','beach-house.mp3','close.mp3','good-dayz.mp3','heartless.mp3','icy.mp3','intentions.mp3','lover.mp3','monster.mp3',
'out-of-my-hands.mp3','red.mp3','strawberry-and-ciggerates.mp3','sunflower.mp3','udd-gaye.mp3','willow.mp3','without-you.mp3','wonder.mp3','you-broke-me-first.mp3']
var imgAddr = ['afterglow.jpg','at-my-worst.jpg','beach-house.jpg','close.jpg','good-dayz.jpg','heartless.jpg','icy.jpg','intentions.jpg','lover.jpg','monster.jpg',
'out-of-my-hands.jpg','red.jpg','strawberry-and-ciggerates.jpg','sunflower.jpg','udd-gaye.wav','willow.jpg','without-you.jpg','wonder.jpg','you-broke-me-first.jpg']

// The Audio Functionality
function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 } 



var PastList = []
var currentIndex = -1;
var ele = document.querySelector('.carousel');

player = new Audio()
var isPaused = true;
var home = './assests/songs/';
var iconPlayPause = document.querySelector('.toggle-play-pause');
var seek = document.querySelector('input');
var currentPlayingImage = document.querySelector('.current-playing-image');
var songInfo = document.querySelector('.song-info');
//audio events
// ranOnce = false;
// player.ended = Next();
// player.timeupdate = MoveSeek();
player.addEventListener('timeupdate',function(){
    MoveSeek();
});
player.addEventListener('ended',function(){
    Next();
});

function userPlay(index){
    userCalledPlay = true;
    Play(index);
}

function Play(index){
    player.src = home+songAddr[index]
    PastList.push(home+player.currentSrc)
    currentIndex=index
    player.play()
    iconPlayPause.innerHTML = 'pause';  //changing the below button to pause symbol
    currentPlayingImage.src = home+songFI[songNames[currentIndex]][0]+'.jpg';   //changing the playing albumart
    songInfo.innerHTML = '<b>'+songNames[currentIndex]+' | '+songArtistName[currentIndex]+'</b>';   //changing the display song name
    skipcount = currentCarsouelNumber-currentIndex;
    console.log('skipcount here'+skipcount);

    M.Carousel.getInstance(ele).set(currentIndex);
    isPaused = false;
    artist = songFI[songNames[currentIndex]][1];
    console.log(artist);
    document.querySelector('.lower-artist-background-image').style.backgroundImage = "url('./assests/songs/ArtistImages/"+artist+".jpg')";
}
function togglePause(){
    if(isPaused){
        iconPlayPause.innerHTML = 'pause';
        player.play();
        isPaused = false;
    }
    else{
        iconPlayPause.innerHTML = 'play_arrow';
        player.pause();
        isPaused = true;
    }
}
function Next(){
    if(currentIndex == songAddr.length-1){currentIndex = -1;}
    Play(++currentIndex);
}
function  Prev(){
    if(currentIndex == -1){currentIndex = songAddr.length-1;}
    Play(--currentIndex);
}
function MoveSeek(){
    var value = (player.currentTime/player.duration)*100;   //percentage of song the player has reached.
    seek.value = value;
}
seek.oninput = function(){
    seekTo(this.value);
}
function seekTo(v){
    player.currentTime = (v*player.duration)/100;
    seek.value = v;
    console.log('going to -'+v);
}
// Play(0);
