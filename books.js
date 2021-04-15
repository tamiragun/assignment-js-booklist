//Instatiating an object for each saved book
function Book(title, author, genre, review) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.review = review;
}

//Creating a new book object each time the form is submitted
let form = document.getElementById("bookForm");
function handleForm(event) { 
    //Preventing the page from refreshing upon submit (see https://stackoverflow.com/a/19454346/12786165):
    event.preventDefault();
    let newBook = new Book(
        document.getElementById("title").value,
        document.getElementById("author").value,
        document.getElementById("genre").value,
        document.getElementById("review").value);
    //Resetting the form values to blank after submit (see https://stackoverflow.com/a/20417453/12786165):
    form.reset();
    //Using the inputted values from the form to display the book on the page, using a method defined below:
    document.getElementById("bookList").appendChild(compileBlock(newBook.title,newBook.author,newBook.genre,newBook.review));
} 
form.addEventListener('submit', handleForm);

//A method to create an HTML codeblock for each submitted book:
function compileBlock(title,author, genre, review) {
    let bookDiv = document.createElement("div");            
        //Some classes for Bootstrap styling, see https://www.w3schools.com/bootstrap4/bootstrap_containers.asp:
        bookDiv.classList.add("container", "border", "p-3", "my-3", "col-lg-3", "bookDiv");    
        
        //Adding the title info to the page
        let titleDiv = document.createElement("div");
        //First, adding the prefix separately so it can be its own span with its own spacing and styling
        let titlePrefixSpan = document.createElement("span");
        titlePrefixSpan.classList.add("prefixSpan");
        titlePrefixSpan.innerHTML = "Title: "
        titleDiv.appendChild(titlePrefixSpan);
        //Then, adding the content, which will take the input enter by the user in the "title" form box
        let titleContentSpan = document.createElement("span");
        titleContentSpan.classList.add("contentSpan");
        titleContentSpan.innerHTML = title;
        titleDiv.appendChild(titleContentSpan);
        //Last, appending the title info to the book container:
        bookDiv.appendChild(titleDiv);

        //Repeating the same but for author info:
        let authorDiv = document.createElement("div");
        let authorPrefixSpan = document.createElement("span");
        authorPrefixSpan.classList.add("prefixSpan");
        authorPrefixSpan.innerHTML = "Author: "
        authorDiv.appendChild(authorPrefixSpan);
        let authorContentSpan = document.createElement("span");
        authorContentSpan.classList.add("contentSpan");
        authorContentSpan.innerHTML = author;
        authorDiv.appendChild(authorContentSpan);
        bookDiv.appendChild(authorDiv);

        //Repeating the same but for genre info:
        let genreDiv = document.createElement("div");
        let genrePrefixSpan = document.createElement("span");
        genrePrefixSpan.classList.add("prefixSpan");
        genrePrefixSpan.innerHTML = "Genre: "
        genreDiv.appendChild(genrePrefixSpan);
        let genreContentSpan = document.createElement("span");
        genreContentSpan.classList.add("contentSpan");
        genreContentSpan.innerHTML = genre;
        genreDiv.appendChild(genreContentSpan);
        bookDiv.appendChild(genreDiv);

        //Repeating the same but for review info:
        let reviewDiv = document.createElement("div");
        let reviewPrefixSpan = document.createElement("span");
        reviewPrefixSpan.classList.add("prefixSpan");
        reviewPrefixSpan.innerHTML = "Review: "
        reviewDiv.appendChild(reviewPrefixSpan);
        let reviewContentSpan = document.createElement("span");
        reviewContentSpan.classList.add("contentSpan");
        reviewContentSpan.innerHTML = review;
        reviewDiv.appendChild(reviewContentSpan);
        bookDiv.appendChild(reviewDiv);

        //Adding controls to edit, save or remove the books

        //Wrapping them in a controls div so I can have the buttons as spans next to each other
        let controlsDiv = document.createElement("div");

        //Creating an edit button that allows the user to change the values directly on the browser
        let editSpan = document.createElement("span");
        editSpan.classList.add("editSpan","btn","btn-primary", "bookBtn");
        editSpan.innerHTML = "Edit"
        controlsDiv.appendChild(editSpan);
        //Adding an event listener so that clicking on the button results in editability
        editSpan.addEventListener("click", function editing() {
            //This makes the values on the page editable
            titleContentSpan.contentEditable="true";
            authorContentSpan.contentEditable="true";
            genreContentSpan.contentEditable="true";
            reviewContentSpan.contentEditable="true";
            editSpan.removeEventListener("click",editing);
            editSpan.style.visibility = "hidden";
            //Creating a save button that only shows when the edit button has been clicked
            let saveBtn = document.createElement("span");
            saveBtn.innerHTML = "Save";
            saveBtn.classList.add("btn","btn-primary", "bookBtn");
            bookDiv.appendChild(saveBtn);
            //Clicking the save button makes the values non editable again and makes the save button disappear
            saveBtn.addEventListener("click", function(){
                titleContentSpan.contentEditable="false";
                authorContentSpan.contentEditable="false";
                genreContentSpan.contentEditable="false";
                reviewContentSpan.contentEditable="false";
                saveBtn.style.display="none";
                editSpan.style.visibility = "visible";
                editSpan.addEventListener("click",editing);
            });
        });

        //Creating a remove button that allows the user to remove a book from the page
        let removeSpan = document.createElement("span");
        removeSpan.classList.add("removeSpan","btn","btn-primary", "bookBtn");
        removeSpan.innerHTML = "Remove";
        //Adding an event listener to the button that removes the entire book container from view.
        removeSpan.addEventListener("click", function(el) {                                 //https://stackoverflow.com/a/8802111/12786165               
            this.parentNode.parentNode.style.display="none";
        });
        controlsDiv.appendChild(removeSpan);
        bookDiv.appendChild(controlsDiv);

    //Returns the final element with all abovecontent, which is passed to the function handleForm() above.
    return bookDiv;
}



