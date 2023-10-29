import musicDB from './music-db/music-db.js';

// Initialize Firebase database
musicDB.open()
    .then(() => {
        console.log("Success in opening");

        var songTitleInput = document.getElementById("songTitleInput");
        var artistNameInput = document.getElementById("artistNameInput");
        var listHeader = document.getElementById("list-header");
        var addbtn = document.getElementById("addbtn");
        var playlistHeader = document.getElementById("playlist-header");
        var songEntryCount = 0;

        function addSong() {
            var songTitleValue = songTitleInput.value;
            var artistNameValue = artistNameInput.value;

            if (songTitleValue === "") {
                alert("Add a Song title");
            } else if (artistNameValue === "") {
                alert("Add an Artist Name");
            } else {
                musicDB.add(songTitleValue, artistNameValue)
                    .then(() => {
                        alert('Music Added Successfully');

                        var mainDiv = document.createElement("div");
                        mainDiv.classList.add("playlistStyle");

                        var songArtwork = document.createElement("div");
                        var songEntry = document.createElement("div");
                        var songDelete = document.createElement("div");

                        var artistImg = document.createElement("img");
                        artistImg.src = "./assets/images/artist.jpg";
                        artistImg.classList.add("song-artwork");

                        var addedSongTitle = document.createElement("h3");
                        addedSongTitle.innerHTML = songTitleValue;
                        addedSongTitle.classList.add("song-header");

                        var addedArtistName = document.createElement("p");
                        addedArtistName.innerHTML = artistNameValue;
                        addedArtistName.classList.add("song-parag");

                        var deleteButton = document.createElement("img");
                        deleteButton.src = "./assets/icons/trash-can-solid.svg";
                        deleteButton.classList.add("delete-btn");

                        function removeItem() {
                            mainDiv.removeChild(songArtwork);
                            mainDiv.removeChild(songEntry);
                            mainDiv.removeChild(songDelete);
                            listHeader.removeChild(mainDiv);
                            songEntryCount--;

                            if (songEntryCount === 0) {
                                playlistHeader.classList.add("hide");
                            }
                        }

                        deleteButton.addEventListener("click", removeItem);

                        listHeader.appendChild(songEntry);
                        songArtwork.appendChild(artistImg);
                        songEntry.appendChild(addedSongTitle);
                        songEntry.appendChild(addedArtistName);
                        songEntry.appendChild(songDelete);
                        songDelete.appendChild(deleteButton);

                        mainDiv.appendChild(songArtwork);
                        mainDiv.appendChild(songEntry);
                        mainDiv.appendChild(songDelete);

                        listHeader.appendChild(mainDiv);

                        songEntryCount++;

                        songTitleInput.value = "";
                        artistNameInput.value = "";
                    })
                    .catch((error) => {
                        console.log('Failed to add song: ', error);
                    });
            }
        }

        addbtn.addEventListener("click", addSong);
    })
    .catch((error) => {
        console.log('Failed to open database: ', error);
    });

// Service worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
        .then((registration) => {
            console.log('Registration successful. Scope is:', registration.scope);
        })
        .catch((error) => {
            console.log('Registration failed. Error:', error);
        });
} else {
    console.log("Service workers not supported");
}
