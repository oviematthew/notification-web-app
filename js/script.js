var songTitleInput = document.getElementById("songTitleInput");
var artistNameInput = document.getElementById("artistNameInput");
var listHeader = document.getElementById("list-header");
var addbtn = document.getElementById("addbtn");
var playlistHeader = document.getElementById("playlist-header")

// Track the number of song entries
var songEntryCount = 0;

function addSong() {
    

    // Get the values from the input fields
    var songTitleValue = songTitleInput.value;
    var artistNameValue = artistNameInput.value;

    // Check if both fields are not empty before adding
    if (songTitleValue === "") {
        alert("Add a Song title");
    }
    else if(artistNameValue === ""){
        alert("Add an Artist Name");
    }
    else{

        // Display playlist Header
        playlistHeader.classList.remove("hide");

         // Create a new <div> element to wrap the song entry
         var mainDiv = document.createElement("div");
         mainDiv.classList.add("playlistStyle");
 
         // Create other divs
         var songArtwork = document.createElement("div");
         var songEntry = document.createElement("div");
         var songDelete = document.createElement("div");
 
         // Create a new image element 
         var artistImg = document.createElement("img");
         artistImg.src = "./assets/images/artist.jpg";
         artistImg.classList.add("song-artwork")
 
         // Create a new <h3> element for the song title
         var addedSongTitle = document.createElement("h3");
         addedSongTitle.innerHTML = songTitleValue;
         addedSongTitle.classList.add("song-header")
 
         // Create a new <p> element for the artist name
         var addedArtistName = document.createElement("p");
         addedArtistName.innerHTML = artistNameValue;
         addedArtistName.classList.add("song-parag")
 
         // Create a delete button
         var deleteButton = document.createElement("img");
         deleteButton.src = "./assets/icons/trash-can-solid.svg";
         deleteButton.classList.add("delete-btn")
 
         function removeItem() {
             // Remove the entire song entry when the delete button is clicked
             mainDiv.removeChild(songArtwork);
             mainDiv.removeChild(songEntry);
             mainDiv.removeChild(songDelete);
             listHeader.removeChild(mainDiv);
             
             // Decrement the song entry count on removal of items
             songEntryCount--;
 
             // Check if all song entries are removed, then hide the playlist header
             if (songEntryCount === 0) {
                 playlistHeader.classList.add("hide");
             }
         }

        //  Remove item on click of delete button
         deleteButton.addEventListener("click", removeItem);
 
         // Append the elements to the song entry <div>
         listHeader.appendChild(songEntry);
         songArtwork.appendChild(artistImg);
         songEntry.appendChild(addedSongTitle);
         songEntry.appendChild(addedArtistName);
         songEntry.appendChild(songDelete);
         songDelete.appendChild(deleteButton);
 
         // Append the all 3 divs to the main div
         mainDiv.appendChild(songArtwork);
         mainDiv.appendChild(songEntry);
         mainDiv.appendChild(songDelete);
 
         // Append main div to one created in html
         listHeader.appendChild(mainDiv);
 
         // Increment the song entry count
         songEntryCount++;
 
         // Clear the input fields
         songTitleInput.value = "";
         artistNameInput.value = "";
    }
}

addbtn.addEventListener("click", addSong);



// Service worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
    .then( (registration) => {
    console.log('Registration successful. Scope is:', registration.scope);
    })
    .catch((error) => {
    console.log('Registration failed. Error:', error);
    });
    }
else {
    console.log("service workers not supported");
}