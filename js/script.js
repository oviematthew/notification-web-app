var songTitleInput = document.getElementById("songTitleInput");
var artistNameInput = document.getElementById("artistNameInput");
var listHeader = document.getElementById("list-header");
var listDelete = document.getElementById("list-delete");
var addbtn = document.getElementById("addbtn");

function addSong() {
    // Get the values from the input fields
    var songTitleValue = songTitleInput.value;
    var artistNameValue = artistNameInput.value;

    // Check if both fields are not empty
    if (songTitleValue !== "" && artistNameValue !== "") {
        // Create a new <div> element to wrap the song entry
        var mainDiv = document.createElement("div");
        mainDiv.classList.add("text-div")
        var songEntry = document.createElement("div");
        var songDelete = document.createElement("div");

        // Create a new <h3> element for the song title
        var addedSongTitle = document.createElement("h3");
        addedSongTitle.innerHTML = songTitleValue;
        addedSongTitle.classList.add("song-header")

        // Create a new <p> element for the artist name
        var addedArtistName = document.createElement("p");
        addedArtistName.innerHTML = artistNameValue;
        addedArtistName.classList.add("song-parag")

        var breakLine = document.createElement("br")

        // Create a delete button
        var deleteButton = document.createElement("img");
        deleteButton.src = "./assets/icons/trash-can-solid.svg";
        deleteButton.classList.add("delete-btn")

        function removeItem() {
            // Remove the entire song entry when the delete button is clicked
            mainDiv.removeChild(songEntry);
            mainDiv.removeChild(songDelete);
        }

        deleteButton.addEventListener("click", removeItem);

        // Append the elements to the song entry <div>
        listHeader.appendChild(songEntry)

        songEntry.appendChild(addedSongTitle);
        songEntry.appendChild(addedArtistName);
        songEntry.appendChild(songDelete);
        songDelete.appendChild(deleteButton);


        // Append the song entry <div> to the appropriate div
        mainDiv.appendChild(songEntry);
        mainDiv.appendChild(songDelete);
        mainDiv.classList.add("flex");

        // Append to main div
        listHeader.appendChild(mainDiv)

       

        // Clear the input fields
        songTitleInput.value = "";
        artistNameInput.value = "";
    }
}

addbtn.addEventListener("click", addSong);
