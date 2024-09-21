// ----- Định nghĩa các biến toàn cục -----
var originalRightLayout = document.querySelector(".right_layout").outerHTML;
var originalLeftLayout = document.querySelector(".left_layout").outerHTML;

var isFalse = true;
var isLoggedIn = false;
var artistIdList = []

var playButton = document.querySelector("#play-btn");
var pauseButton = document.querySelector("#pause-btn");
var audioElement = document.getElementById("audioPlayer");
var progressBar = document.getElementById("progress");
var previousBtn = document.getElementById("previousBtn");
var nextBtn = document.getElementById("nextBtn");

var currentsongIndex = 0;
var nameMusicFooter = document.querySelector('#name_music');
var nameArtistFooter = document.querySelector('#name_artist');

var aboutArtistImg = document.querySelector('.about_artist img')
var infoArtistImg = document.querySelector('.image_artist img')





var dataMusicHtml
// console.log("rightLayoutMusic")


//------------------Lấy nội dung data.json
let playlists = [];
let allsongLists = [];

console.log("playlists from outside", playlists);
// fetch('data.json')
//     .then(response => {
//         if (!response.ok) throw new Error('Network response was not ok');
//         return response.json();
//     })
//     .then(data => {
//         playlists = data.playlists;
//         if (playlists.length > 0) {
//             playCurrentSong(currentsongIndex);
//         }
//     })
//     .catch(error => console.error('There has been a problem with your fetch operation:', error));

// ----- Xử lý Nội Dung Trang Right Layout Info -----
var isFalse = true;
var isQueueShow = true;

function Info() { 
  var rightLayoutInfo = document.querySelector(".right_layout_info");
  var rightLayoutQueue = document.querySelector('.right_layout_queue');
  var rightLayout = document.querySelector(".right_layout");

  if (isFalse) {
    rightLayoutInfo.style.display = "block";
    rightLayoutQueue.style.display = "none"; 
    rightLayout.style.width = "50%";
    isFalse = false;
    isQueueShow = true; 
  } else {
    rightLayoutInfo.style.display = "none";
    rightLayout.style.width = "75%";
    isFalse = true;
  }
}

function Queue() {
  var rightLayoutInfo = document.querySelector(".right_layout_info");
  var rightLayoutQueue = document.querySelector('.right_layout_queue');
  var rightLayout = document.querySelector(".right_layout");

  if (isQueueShow) {
    rightLayoutQueue.style.display = "block";
    rightLayoutInfo.style.display = "none"; 
    rightLayout.style.width = "50%";
    isQueueShow = false;
    isFalse = true; 
  } else {
    rightLayoutQueue.style.display = "none";
    rightLayout.style.width = "75%";
    isQueueShow = true;
  }
}

//------ Xử lý Nội dung Lyris
var isShow = false;
function Lyris(){
    if(!isShow){
        var rightLayoutMusic = document.querySelector('#right_layout_music')
        var rightLayoutLyrics = document.querySelector('#right_layout_lyrics')
        rightLayoutMusic.style.display ="none"
        rightLayoutLyrics.style.display = 'block'
        isShow =true
    }else{
        // console.log("sai")
        var rightLayoutMusic = document.querySelector('#right_layout_music')
        var rightLayoutLyrics = document.querySelector('#right_layout_lyrics')
        rightLayoutMusic.style.display ="block"
        rightLayoutLyrics.style.display = 'none'
        isShow =false
    }
  
    // var originalRightLayoutMusic = document.querySelector('#right_layout_music')

    // console.log("rightLayoutMusic",originalRightLayoutMusic)
    // //  var lyrisElement = document.querySelector('.lyrics')
    // console.log("isHow",!isShow)    
    // if(!isShow){
    //     fetch('./components/lyris.html')
    //     .then((dataLyris) =>{
    //         return dataLyris.text();
    //     })
    //     .then((dataLyris)=>{
    //         originaldataLyris = da
    //         console.log("rightLayoutMusic2",dataLyris)
    //         // console.log("dataaa",dataMusicHtml)
    //         // var dataMusicHtml = document.querySelector(./)
    //         originalRightLayoutMusic.outerHTML = dataLyris   
    //     })
      
    //     isShow = true
    // }else{
    //     dataLyris.outerHTML = originalRightLayoutMusic
    // }
   


}

// ----- Xử lý Đăng Nhập -----
function Login() {
  var accountElement = document.querySelector(".account-container");
  var authElement = document.querySelector(".authentication");

  if (!isLoggedIn) {

    fetch("./components/music.html")
        .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
        })
        .then((data) => {
            dataMusicHtml = data
        var rightLayout = document.querySelector(".right_layout");
        rightLayout.outerHTML = data;

        
            renderCardCircle()
            renderCardSquare()
           
        })
        .catch((error) =>
            console.error(
            "There has been a problem with your fetch operation:",
            error
            )
        );

    fetch("./components/myLibrary.html")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then((data) => {
        var leftLayout = document.querySelector(".left_layout");
        leftLayout.outerHTML = data;
      })
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );

    accountElement.style.display = "block";
    authElement.style.display = "none";
    isLoggedIn = true;
  } else {
    console.log("Confirm Login");
  }
}


// ----- Xử lý Đăng Xuất -----
function Logout() {
  var accountName = document.querySelector("#accountName");
  var accountOptions = document.querySelector("#accountOptions");
  var authElement = document.querySelector(".authentication");
  var accountElement = document.querySelector(".account-container");
  var rightLayout = document.querySelector(".right_layout");

  accountOptions.style.display = "block";

  var logoutButton = document.querySelector("#logoutButton");
  logoutButton.onclick = function () {
    if (isLoggedIn) {
      accountElement.style.display = "none";
      accountOptions.style.display = "none";
      authElement.style.display = "flex";
      document.querySelector(".right_layout").outerHTML = originalRightLayout;
      document.querySelector(".left_layout").outerHTML = originalLeftLayout;
      isLoggedIn = false;
    } else {
      console.log("Already logged out");
    }
  };
}
//--------Xử lý phẩn hiển thị Card-----------------
function renderCardCircle(){


    fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
    console.log(data);
    const artistContainer = document.getElementById("artistContainer");
    // artistContainer.onclick = function () {};
    data.artists.forEach((artist) => {
        ///Tạo cirlebox
        const cardCircleBox = document.createElement("div");
        cardCircleBox.classList.add("card_cirle_box");
        const cardCircle = document.createElement("div");
        cardCircle.classList.add("card_cirle");

        const img = document.createElement("img");
        img.src = artist.avatar;
        img.alt = artist.name;

        cardCircle.appendChild(img);

        const nameArtists = document.createElement("div");
        nameArtists.classList.add("name_artists");

        const pName = document.createElement("p");
        pName.textContent = artist.name;

        const pRole = document.createElement("p");
        pRole.textContent = "Artist";

        nameArtists.appendChild(pName);
        nameArtists.appendChild(pRole);

        cardCircleBox.appendChild(cardCircle);
        cardCircleBox.appendChild(nameArtists);

        artistContainer.appendChild(cardCircleBox);
        
        
        cardCircle.onclick = function () {

        document.querySelector('#play-btn').style.display = 'none'
        document.querySelector('#pause-btn').style.display = 'block'
        currentsongIndex = 0;
        playlists = [];
        console.log("Id của từng artist: ", artist.albums);

        var musicItemImg = document.querySelector('.music_item_img img')
        musicItemImg.src = artist.avatar

        //DOM right_layout_info
        var infoArtistImg = document.querySelector('.image_artist img')
  
        infoArtistImg.src = artist.aboutus

        var aboutArtistImg = document.querySelector('.about_artist img')
        aboutArtistImg.src = artist.avatar

        
        artist.albums.forEach((album) => {
            // DOM right Layout
            var infoh3Element = document.querySelector('.info_artist h3');
            infoh3Element.innerHTML = album.title;
            var abouth3Element = document.querySelector('.about_artist h3');
            abouth3Element.innerHTML = artist.name;
            
            if (!artistIdList.includes(artist.id)) {
                var myLibrary = document.querySelector('#myLibrary');
                const playlistCard = document.createElement('div');
                playlistCard.classList.add('card_playlists');
        
                const cardImg = document.createElement('div');
                cardImg.classList.add('card_img');
                
                const img = document.createElement('img');
                img.src = artist.avatar; 
                img.alt = album.title;
        
                cardImg.appendChild(img);
        
                const cardInfo = document.createElement('div');
                cardInfo.classList.add('card_info');
        
                const titleMusic = document.createElement('div');
                titleMusic.classList.add('title_music');
        
                const h3 = document.createElement('h3');
                h3.textContent = album.title;
        
                titleMusic.appendChild(h3);
        
                const playlistsContent = document.createElement('div');
                playlistsContent.classList.add('playlists_content');
        
                const p = document.createElement('p');
                p.textContent = `Playlists • ${album.tracks.length} song${album.tracks.length > 1 ? 's' : ''}`;
        
                playlistsContent.appendChild(p);
        
                cardInfo.appendChild(titleMusic);
                cardInfo.appendChild(playlistsContent);
        
                playlistCard.appendChild(cardImg);
                playlistCard.appendChild(cardInfo);
        
                myLibrary.appendChild(playlistCard);
        
                artistIdList.push(artist.id);
        
                // Xử lý sự kiện cho phần tử cardImg LeftLayout
                cardImg.addEventListener('click', () => {
                    var audioPlayer = document.querySelector('#audioPlayer');
                    audioPlayer.src = album.tracks[0].url;
                    audioPlayer.play(); 
        
                    // Cập nhật thông tin ở footer
                    nameMusicFooter.innerHTML = album.tracks[0].title;
                    nameArtistFooter.innerHTML = artist.name;
                    infoArtistImg.src = artist.aboutus
                    aboutArtistImg.src = artist.avatar
                    
                    var musicItemImg = document.querySelector('.music_item_img img')
                    musicItemImg.src = artist.avatar


                });
            }
            album.tracks.forEach((tracks) => {
                playCurrentSong(currentsongIndex)
                playlists.push(tracks.url);
                nameMusicFooter.innerHTML = tracks.title;
                nameArtistFooter.innerHTML = artist.name;
                var infoArtistname = document.querySelector('.info h3')
            });
        });
        
        };
    });
    })
    .catch((error) => console.error("Errolllll", error));

}

function CreateCardSquareBox(track, artistContainerSquareBox) {
  const CardSquareBox = document.createElement("div");
  CardSquareBox.classList.add("card_square_box");

  const CardSquare = document.createElement("div");
  CardSquare.classList.add("card_square");

  const img = document.createElement("img");
  img.src = track.img;
  img.alt = track.title;

  const buttonAdd = document.createElement("button");
  buttonAdd.classList.add("add-button");
  buttonAdd.textContent = "+";

  CardSquare.appendChild(img);
  CardSquare.appendChild(buttonAdd);

  const nameArtists = document.createElement("div");
  nameArtists.classList.add("name_artists");

  const pName = document.createElement("p");
  pName.textContent = track.title;

  const pRole = document.createElement("p");
  pRole.textContent = "9.000.000";

  nameArtists.appendChild(pName);
  nameArtists.appendChild(pRole);

  CardSquareBox.appendChild(CardSquare);
  CardSquareBox.appendChild(nameArtists);

  artistContainerSquareBox.appendChild(CardSquareBox);

  // Xử lý sự kiện khi nhấn vào nút add-button
  // buttonAdd.onclick = function() {
  //   playlists.push(track.url)
  //   playCurrentSong(currentsongIndex)
  //   console.log("clicked from trackinfo", track.url)


  //     // Lấy phần tử right_layout_queue
  //     const rightLayoutQueue = document.querySelector(".right_layout_queue");
  //     console.log(playlists)

  //     // Tạo một div chứa thông tin bài hát
  //     const trackInfo = document.createElement("div");
  //     trackInfo.classList.add("track_info");

  //     const trackTitle = document.createElement("p");
  //     trackTitle.textContent = `Title: ${track.title}`;

  //     const trackArtist = document.createElement("p");
  //     trackArtist.textContent = `Artist: ${artistContainerSquareBox.querySelector('.name_artists p').textContent}`;

  //     const trackImg = document.createElement("img");
  //     trackImg.src = track.img;
  //     trackImg.alt = track.title;
  //     trackImg.style.width = "50px"; // Điều chỉnh kích thước ảnh

  //     trackInfo.appendChild(trackImg);
  //     trackInfo.appendChild(trackTitle);
  //     trackInfo.appendChild(trackArtist);

  //     rightLayoutQueue.appendChild(trackInfo);
  //     trackInfo.onclick = function(){

  //     }
  // };

  return CardSquare;
}

function renderCardSquare(){
    fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const artistContainerSquareBox = document.getElementById("artistContainerSquareBox");

        data.artists.forEach((artist) => {
          artist.albums.forEach(album => {
              album.tracks.forEach(track => {
                  allsongLists.push(track);
      
                  const card = CreateCardSquareBox(track, artistContainerSquareBox);
      
                  // Gán sự kiện cho card để phát nhạc
                  card.onclick = function() {
                      console.log("hahah", track.title);
                      document.querySelector('#play-btn').style.display = 'none';
                      document.querySelector('#pause-btn').style.display = 'block';
      
                      // Reset playlist khi phát bài từ card
                      currentsongIndex = 0;
                      playlists = [track.url]; // Reset playlist với track hiện tại
      
                      // Cập nhật thông tin nhạc
                      var musicItemImg = document.querySelector('.music_item_img img');
                      musicItemImg.src = artist.avatar;
      
                      var infoArtistImg = document.querySelector('.image_artist img');
                      infoArtistImg.src = track.img;
      
                      var aboutArtistImg = document.querySelector('.about_artist img');
                      aboutArtistImg.src = artist.avatar;
      
                      var infoArtistname = document.querySelector('.info h3');
                      infoArtistname.innerHTML = track.title;
      
                      var aboutArtistname = document.querySelector('.about_artist h3');
                      aboutArtistname.innerHTML = artist.name;
      
                      playCurrentSong(currentsongIndex);
                      nameMusicFooter.innerHTML = track.title;
                      nameArtistFooter.innerHTML = artist.name;
                  };
      
                  const buttonAdd = card.querySelector('.add-button');
                  buttonAdd.onclick = function(event) {
                      event.stopPropagation(); 
      
                      playlists.push(track.url);
      
                      const rightLayoutQueue = document.querySelector(".right_layout_queue");
      
                      const trackInfo = document.createElement("div");
                      trackInfo.classList.add("track_info");
      
                      const trackTitle = document.createElement("p");
                      trackTitle.textContent = `Title: ${track.title}`;
      
                      const trackArtist = document.createElement("p");
                      trackArtist.textContent = `Artist: ${artist.name}`;
      
                      const trackImg = document.createElement("img");
                      trackImg.src = track.img;
                      trackImg.alt = track.title;
                      trackImg.style.width = "50px"; // Điều chỉnh kích thước ảnh
      
                      trackInfo.appendChild(trackImg);
                      trackInfo.appendChild(trackTitle);
                      trackInfo.appendChild(trackArtist);
      
                      rightLayoutQueue.appendChild(trackInfo);
      
                      if (playlists.length === 1 && currentsongIndex === 0) {
                          currentsongIndex = 0; 
                          playCurrentSong(currentsongIndex); 
                      }
                  };
              });
          });
      });
      
      

      
    })
    
    

}
////

// ----- Xử lý Âm Thanh -----

// var playlists = [
//     './assets/music/Elizabeth Bloodflame sings Skyfall.mp3',
//     './assets/music/Lady Gaga, Bruno Mars - Die With A Smile.mp3',
//     './assets/music/live-to-die-195199.mp3',
//     './assets/music/Vaundy - Odoriko (踊り子) (Lyrics) (Rom⧸Eng).mp3'
// ];

// Hàm phát bài hát hiện tại
function playCurrentSong(index) {
  if (index >= 0 && index < playlists.length) {
    audioElement.src = playlists[index];
    // audioElement.play();
    var playPromise = audioElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
     
          video.pause();
        })
        .catch((error) => {
     
        });
    }
  } else {
    console.log("Invalid index");
  }
}

// Xử lý nút play
playButton.onclick = () => {
  pauseButton.style.display = "block";
  playButton.style.display = "none";
  audioElement.play();
};

// Xử lý nút pause
pauseButton.onclick = () => {
  pauseButton.style.display = "none";
  playButton.style.display = "block";
  audioElement.pause();
};

// Tự động chuyển bài khi hết nhạc
// audioElement.onended = function () {
//   if (currentsongIndex < playlists.length - 1) {
//     currentsongIndex++;
//     playCurrentSong(currentsongIndex);
//   }
// };

// Xử lý nút previous
previousBtn.onclick = function () {
  if (currentsongIndex > 0) {
    currentsongIndex--;
    playCurrentSong(currentsongIndex);
  }
};

// Xử lý nút next
nextBtn.onclick = function () {
  if (currentsongIndex < playlists.length - 1) {
    currentsongIndex++;
    playCurrentSong(currentsongIndex);
  }
};

// Cập nhật thanh tiến trình
audioElement.ontimeupdate = function () {
  if (audioElement.duration) {
    var progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress;
  }
};

// Xử lý thanh tiến trình khi người dùng thay đổi
progressBar.oninput = function () {
  var seekTime = (progressBar.value / 100) * audioElement.duration;
  audioElement.currentTime = seekTime;
};

//Xử lý voloum
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const volumeSlider = document.getElementById('sound');

    audioPlayer.volume = volumeSlider.value / 100;

    volumeSlider.addEventListener('input', () => {
        audioPlayer.volume = volumeSlider.value / 100;
    });
});

// Xử lý nút lặp lại 
let isRepeat = false;
var repeatBtn = document.getElementById('repeatBtn');

repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat); 
});
audioPlayer.addEventListener('ended', () => {
    if (isRepeat) {
        // Nếu đang ở chế độ lặp lại, lặp lại bài hát hiện tại
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        // Nếu không ở chế độ lặp lại, kiểm tra danh sách phát
        if (currentsongIndex < playlists.length - 1) {
            // Chuyển sang bài hát tiếp theo nếu có bài hát tiếp theo
            currentsongIndex++;
            playCurrentSong(currentsongIndex);
        }
    }
});

// audioPlayer.addEventListener('ended', () => {
//     if (isRepeat) {
//         audioPlayer.currentTime = 0;
//         audioPlayer.play();
//     }
// });

// const audioPlayer = document.getElementById('audioPlayer');
const lyrics = document.querySelectorAll('.lyrics_container p'); 

if (lyrics.length === 0) {
    console.error("No lyrics found!");
}

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    // console.log("Current time:", currentTime);

    lyrics.forEach((line, index) => {
        // console.log("Line text:", line.textContent); 
        const startTime = parseFloat(line.getAttribute('data-time'));
        // console.log("Start time:", startTime); 

        if (currentTime >= startTime) {
            lyrics.forEach((l, i) => {
                if (i < index) l.classList.remove('active');
            });
            line.classList.add('active');
        }
    });
});
//Xử lý nút zoom
const zoomBtn = document.querySelector('.zoom_in');
const normalPlayer = document.querySelector('.music_controls');
const zoomPlayer = document.getElementById('zoomPlayer');

zoomBtn.addEventListener('click', () => {
    if (zoomPlayer.style.display === 'none') {
        zoomPlayer.style.display = 'block';
        // normalPlayer.style.display = 'none';
    } else {
        zoomPlayer.style.display = 'none';
        normalPlayer.style.display = 'block';
    }
});
//Zoom out
document.getElementById('zoomOutButton').addEventListener('click', function() {
    document.getElementById('zoomPlayer').style.display = 'none';
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('zoomPlayer').style.display = 'none';
    }
});

// Đồng bộ hóa thanh progress trong cả hai chế độ
const progress = document.getElementById('progress');
const progressZoomed = document.getElementById('progressZoomed');

audioPlayer.addEventListener('timeupdate', () => {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.value = progressPercent;
    progressZoomed.value = progressPercent;
});

progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

progressZoomed.addEventListener('input', () => {
    const seekTime = (progressZoomed.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});
//
var requestLogin = document.querySelector('.requestLogin')
requestLogin.onclick = function(){
    requestLogin.style.display ='none'

}
var mainElementImg = document.querySelectorAll(".main_flex_wrapper img")
mainElementImg.forEach( img=>{
    img.onclick =function(){
        requestLogin.style.display ='flex'
    }
})


var mainElementBtn = document.querySelectorAll(".main_flex_wrapper button")
mainElementBtn.forEach( btn=>{
    btn.onclick =function(){
        requestLogin.style.display ='flex'
    }
})

//queue nhạc




//Tìm kiếm đơn giản
// document.addEventListener('DOMContentLoaded', function() {
//     let artists = [];
  
//     fetch('data.json')
//       .then(response => response.json())
//       .then(data => {
//         artists = data.artists;
//         setupSearch(); // Khởi tạo sự kiện tìm kiếm sau khi dữ liệu đã được tải
//       })
//       .catch(error => console.error('Error fetching data:', error));
    
//     function setupSearch() {
//       const searchInput = document.querySelector('.search input'); // Chọn đúng phần tử input
//       if (searchInput) {
//         searchInput.addEventListener('input', search);
//       } else {
//         console.error('Search input element not found.');
//       }
//     }
  
//     function search() {
//       const searchTerm = document.querySelector('.search input').value.toLowerCase();
//       const results = [];
  
//       artists.forEach(artist => {
//         if (artist.name.toLowerCase().includes(searchTerm)) {
//           results.push({
//             type: 'artist',
//             name: artist.name,
//             avatar: artist.avatar
//           });
//         }
  
//         artist.albums.forEach(album => {
//           if (album.title.toLowerCase().includes(searchTerm)) {
//             results.push({
//               type: 'album',
//               name: album.title,
//               artist: artist.name
//             });
//           }
//           album.tracks.forEach(track => {
//             if (track.title.toLowerCase().includes(searchTerm)) {
//               results.push({
//                 type: 'track',
//                 name: track.title,
//                 album: album.title,
//                 artist: artist.name,
//                 img: track.img,
//                 url: track.url
//               });
//             }
//           });
//         });
//       });
  
//       displayResults(results);
//     }
  
//     function displayResults(results) {
//       const resultsContainer = document.querySelector('.right_layout_content');
//       resultsContainer.innerHTML = ''; 
  
//       results.forEach(result => {
//         // const item = document.createElement('div');
//         // item.classList.add('result-item');
//         console.log("ádasdasdasdasd",result)
//         const cardCircleBox = document.createElement("div");
//         cardCircleBox.classList.add("card_cirle_box");
//         const cardCircle = document.createElement("div");
//         cardCircle.classList.add("card_cirle");

//         const img = document.createElement("img");
//         img.src = result.avatar;
//         img.alt = result.name;

//         cardCircle.appendChild(img);

//         const nameArtists = document.createElement("div");
//         nameArtists.classList.add("name_artists");

//         const pName = document.createElement("p");
//         pName.textContent = result.name;

//         const pRole = document.createElement("p");
//         pRole.textContent = "Artist";

//         nameArtists.appendChild(pName);
//         nameArtists.appendChild(pRole);

//         cardCircleBox.appendChild(cardCircle);
//         cardCircleBox.appendChild(nameArtists);

//         artistContainer.appendChild(cardCircleBox);
        
  
//         if (result.type === 'artist') {
//           item.innerHTML = `<img src="${result.avatar}" alt="${result.name}"><span>${result.name}</span>`;
//         } else if (result.type === 'album') {
//           item.innerHTML = `<span>Album: ${result.name} - ${result.artist}</span>`;
//         } else if (result.type === 'track') {
//           item.innerHTML = `<img src="${result.img}" alt="${result.name}"><span>${result.name} - ${result.artist}</span>`;
//         }
  
//         resultsContainer.appendChild(item);
//       });
//     }
//   });
  