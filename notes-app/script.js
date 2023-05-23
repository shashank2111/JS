const addBtnElement = document.getElementById('add-btn');
const bodyElement = document.querySelector('.main-body')
const savedWindow = document.querySelector('.saved-window')
//TODO: add the functionality for settings button so that if we click it, we get an option of checkboxes where we select multiple notes and simultaneously delete them.

if (localStorage.getItem('notes') == null) {
    let allNotes = new Map();
    console.log(allNotes)
    localStorage.setItem('notes', JSON.stringify(Array.from(allNotes)) );
}

notesContainerElementInnerHtml = `
    <div class="notes-tools">
        <div>
            <i class="icons-left fas fa-ellipsis-h fa-lg" style="color: #9ec862;" id="menu-btn"></i>
            <i class="icons-left fa-solid fa-gear" style="color: #9ec862;" id="settings-btn"></i>
        </div>
        <div>
            <i class="icons-right fa-solid fa-trash" id="delete-btn"></i>
            <i class="icons-right close fa-sharp fa-solid fa-xmark fa" id="save-btn"> save </i>
        </div>
    </div>
    <div class="notes-text">
        <div class="notes-box">
            <div class="notes-header">
                <input type="text" placeholder="title">
                <!-- <button> add </button> -->
            </div>
            <textarea name="notes" id="notes" cols="30" rows="14" placeholder="Type here..."></textarea>
        </div>
    </div>
`;

fetchNotes()


function helper(...args) {
    const noteElement = document.createElement('div');
    
    let noteId = `${args[0]}`;
    noteElement.id = `${noteId}`;
    noteElement.className = 'notes-container';
    noteElement.innerHTML = notesContainerElementInnerHtml;

    bodyElement.appendChild(noteElement);

    const saveBtnElement = noteElement.querySelector('#save-btn');
    const deleteBtnElement = noteElement.querySelector('#delete-btn');

    const titleElement = noteElement.querySelector('input');
    const textAreaElement = noteElement.querySelector('textarea');

    titleElement.value = args[1].header;
    textAreaElement.value = args[1].body;

    saveBtnElement.addEventListener('click', () => {
        const note = {
            header: titleElement.value,
            body: textAreaElement.value,
        };

        let allNotes = getAllNotesLS();
        allNotes.set(noteId, note);
        localStorage.setItem('notes', JSON.stringify(Array.from(allNotes)));

        displaySavedMessage()
    });

    deleteBtnElement.addEventListener('click', () => {
        let allNotes = getAllNotesLS();
        allNotes.delete(noteId);
        localStorage.setItem('notes', JSON.stringify(Array.from(allNotes)));

        bodyElement.removeChild(noteElement)
    });
}


addBtnElement.addEventListener('click', () => {
    let x = {header:'', body:''}
    helper(Date.now(), x)
});

function fetchNotes() {
    let allNotes = getAllNotesLS();
    for (let [key, value] of allNotes.entries()) {
        helper(key, value)
    }
}

function getAllNotesLS() {
    const allNotes = JSON.parse(localStorage.getItem('notes'));
    return (allNotes == null ? (new Map()) : new Map(allNotes) );
}

// function tempAlert(msg, duration) {
//     var el = document.createElement('div');
//     el.setAttribute(
//         'style',
//         'position:absolute;top:40%;left:20%;background-color:white;'
//     );
//     el.innerHTML = msg;
//     setTimeout(function () {
//         el.parentNode.removeChild(el);
//     }, duration);
//     document.body.appendChild(el);
// }

function displaySavedMessage() {
    savedWindow.style.display = 'block';
    setTimeout(function () {
        savedWindow.style.display = 'none';
    }, 1000)
    
}