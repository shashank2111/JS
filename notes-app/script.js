const menuBtnElement = document.getElementById('menu-btn');
const addBtnElement = document.getElementById('add-btn');
const settingsBtnElement = document.getElementById('settings-btn');
const trashBtnElement = document.getElementById('trash-btn')

const notesTextElement = document.querySelector('.notes-text')
const notesBoxElement = document.querySelector('.notes-box');
const textAreaElement = document.querySelector('textarea')
const inputHeaderElement = document.querySelector('input')

const bodyElement = document.querySelector('body')

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
                <input type="text">
                <!-- <button> add </button> -->
            </div>
            <textarea name="notes" id="notes" cols="30" rows="14"></textarea>
        </div>
    </div>
`;


addBtnElement.addEventListener('click', () => {

    const noteElement = document.createElement('div')
    noteElement.className = 'notes-container'
    
    const noteId = `${Date.now()}`
    noteElement.id = `${noteId}`
    noteElement.innerHTML = notesContainerElementInnerHtml

    bodyElement.appendChild(noteElement)

    const saveBtnElement = noteElement.querySelector('#save-btn');
    const deleteBtnElement = noteElement.querySelector('#delete-btn')

    const titleElement = noteElement.querySelector('input')
    const textAreaElement = noteElement.querySelector('textarea')

    saveBtnElement.addEventListener('click', () => {       
        const note = {
            'header': titleElement.value,
            'body': textAreaElement.value,
        };

        let allNotes = getAllNotes();
        // console.log(typeof(allNotes))
        allNotes.set(noteId, note);
        localStorage.setItem("notes", JSON.stringify(Array.from(allNotes)) )
        console.log(localStorage.getItem("notes"))
    })

    deleteBtnElement.addEventListener('click', () => {
        bodyElement.removeChild(noteElement)
        
        let allNotes = getAllNotes();        
        allNotes.delete(noteId)
        localStorage.setItem('notes', JSON.stringify(Array.from(allNotes)));
        console.log(localStorage.getItem('notes'))
    })

});


function getAllNotes() {
    const allNotes = JSON.parse(localStorage.getItem('notes'));
    return (allNotes == null ? (new Map()) : new Map(allNotes) );
}
