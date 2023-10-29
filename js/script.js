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

        // Function to load existing songs from the database
        async function loadSongsFromDatabase() {
            const querySnapshot = await musicDB.getAllSongs();

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const docId = doc.id; // Get the document ID
                const songTitle = data.songTitle;
                const artistName = data.artistName;
                const likes = data.likes;

                // Create the HTML elements for the new song entry
                var mainDiv = document.createElement("div");
                mainDiv.classList.add("playlistStyle");

                var songArtwork = document.createElement("div");
                var songEntry = document.createElement("div");
                var songDelete = document.createElement("div");

                var artistImg = document.createElement("img");
                artistImg.src = "./assets/images/artist.jpg";
                artistImg.classList.add("song-artwork");

                var addedSongTitle = document.createElement("h3");
                addedSongTitle.innerHTML = songTitle;
                addedSongTitle.classList.add("song-header");

                var addedArtistName = document.createElement("p");
                addedArtistName.innerHTML = artistName;
                addedArtistName.classList.add("song-parag");

                var likeButton = document.createElement("i");
                likeButton.classList.add("fas", "fa-thumbs-up", "like-btn");
                var likeCount = document.createElement("span");
                likeCount.classList.add("like-count");
                likeCount.innerText = likes;

                var songLikes = document.createElement("div");
                songLikes.classList.add("song-likes");
                songLikes.appendChild(likeButton);
                songLikes.appendChild(likeCount);

                // Event listener to handle likes
                likeButton.addEventListener("click", async function () {
                    // Increment likes in the UI
                    const currentLikes = parseInt(likeCount.innerText);
                    likeCount.innerText = currentLikes + 1;

                    // Update likes in the database
                    await musicDB.updateLikes(docId, currentLikes + 1);
                });

                var deleteButton = document.createElement("img");
                deleteButton.src = "./assets/icons/trash-can-solid.svg";
                deleteButton.classList.add("delete-btn");

                // Event listener to handle delete
                function removeItem() {
                    // Find the mainDiv that contains the clicked delete button
                    var mainDiv = this.parentElement.parentElement;

                    // Remove the song entry from the database
                    musicDB.remove(docId)
                        .then(() => {
                            // Remove the entire song entry from the list
                            mainDiv.remove();
                            songEntryCount--;

                            // Check if all song entries are removed, then hide the playlist header
                            if (songEntryCount === 0) {
                                playlistHeader.classList.add("hide");
                            }

                            alert("Song deleted from both the list and the database.");
                        })
                        .catch((error) => {
                            console.log('Failed to remove song: ', error);
                        });
                }

                deleteButton.addEventListener("click", removeItem);

                // Append elements to the song entry div
                songArtwork.appendChild(artistImg);
                songEntry.appendChild(addedSongTitle);
                songEntry.appendChild(addedArtistName);
                songEntry.appendChild(songDelete);
                songDelete.appendChild(deleteButton);
                songEntry.appendChild(songLikes);

                mainDiv.appendChild(songArtwork);
                mainDiv.appendChild(songEntry);
                mainDiv.appendChild(songDelete);

                // Append the mainDiv to the listHeader
                listHeader.appendChild(mainDiv);

                songEntryCount++;
            });

            // If there are songs in the database, show the playlist header
            if (songEntryCount > 0) {
                playlistHeader.classList.remove("hide");
            }
        }

        // Call the function to load songs on page load
        window.addEventListener("load", loadSongsFromDatabase);

        // Function to add a song
        function addSong() {
            var songTitleValue = songTitleInput.value;
            var artistNameValue = artistNameInput.value;

            if (songTitleValue === "") {
                alert("Add a Song title");
            } else if (artistNameValue === "") {
                alert("Add an Artist Name");
            } else {
                musicDB.add(songTitleValue, artistNameValue, 0)
                    .then((docRef) => {
                        alert('Music Added Successfully');

                        // Get the generated document ID
                        const docId = docRef.id;

                        // Create the HTML elements for the new song entry
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


                        var likeText = document.createElement('span');
                        likeText.innerText = "Like";
                        likeText.classList.add("like-text");
                        
                        
                        var likeButton = document.createElement("i");
                        likeButton.classList.add("fas", "fa-thumbs-up", "like-btn");
                        
                        var likeCount = document.createElement("span");
                        likeCount.classList.add("like-count");
                        likeCount.innerText = 0;
                        
                        var songLikes = document.createElement("div");
                        songLikes.classList.add("song-likes");
                        songLikes.appendChild(likeText); 
                        songLikes.appendChild(likeButton);
                        songLikes.appendChild(likeCount);
                        

                        likeButton.addEventListener("click", async function () {
                            var currentLikes = parseInt(likeCount.innerText);
                            currentLikes++;
                            likeCount.innerText = currentLikes;

                            await musicDB.updateLikes(docId, currentLikes);
                        });


                        //delete song
                        var deleteButton = document.createElement("img");
                        deleteButton.src = "./assets/icons/trash-can-solid.svg";
                        deleteButton.classList.add("delete-btn");

                        function removeItem() {
                            var mainDiv = this.parentElement.parentElement;
                            var songTitle = mainDiv.querySelector(".song-header").textContent;
                            var artistName = mainDiv.querySelector(".song-parag").textContent;

                            musicDB.remove(docId)
                                .then(() => {
                                    mainDiv.remove();
                                    songEntryCount--;

                                    if (songEntryCount === 0) {
                                        playlistHeader.classList.add("hide");
                                    }

                                    alert("Song deleted from both the list and the database.");
                                })
                                .catch((error) => {
                                    console.log('Failed to remove song: ', error);
                                });
                        }
                        //Add click listener to delete button
                        deleteButton.addEventListener("click", removeItem);

                        songArtwork.appendChild(artistImg);
                        songEntry.appendChild(addedSongTitle);
                        songEntry.appendChild(addedArtistName);
                        songEntry.appendChild(songDelete);
                        songDelete.appendChild(deleteButton);
                        songEntry.appendChild(songLikes);

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
