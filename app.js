const addBtn = document.getElementById("addbtn");
const parent = document.getElementById("parent");
const textBox = document.getElementById("textbox");



showNote()
addBtn.addEventListener('click', addTasks);

function addTasks() {
    let str = `
    <div class="content_div col-sm-3">
    <div class="textarea_div">
        <div class="control_div">
            <i class="far fa-edit"></i>
            <i onclick="clearTask(event)" class="fas fa-trash-alt"></i>
        </div>
        <textarea onkeypress="keypressfunc(event)" class="textarea"></textarea>
    </div>
</div>
    `
    parent.insertAdjacentHTML('beforeend', str);
}

function clearTask(event) {
    let targetParent = event.target.parentElement.parentElement.parentElement
    targetParent.remove()

}


function keypressfunc(event) {
    if (event.key == 'Enter') {
        let notesValue = event.target.value;

        let notes = localStorage.getItem('notes');
        if (notes == null) {
            notesArr = [];
        } else {
            notesArr = JSON.parse(notes);
        }

        notesArr.push(notesValue);
        localStorage.setItem('notes', JSON.stringify(notesArr));

        showNote()
    }
}

function showNote() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesArr = [];
    } else {
        notesArr = JSON.parse(notes);
    }
        let str = ''
        notesArr.forEach((note,index) => {

            str += `
            <div class="content_div col-sm-3">
            <div class="textarea_div">
                <div class="control_div">
                    <i onclick="changeFunc(event)" class="far fa-edit"></i>
                    <i onclick="deleteFunc(event)" class="fas fa-trash-alt"></i>
                </div>
                <textarea disabled class="textarea" id="${index}" >${note}</textarea>
            </div>
        </div>
            `
        })

        if(notesArr.length != 0){
            parent.innerHTML = str;
        }
        else {
            parent.innerHTML = ''
        }
    }



checked = true;

function changeFunc(event) {

    checked ? editFunc(event) : saveFunc(event)

}

function editFunc(event) {

    let targetTextArea = event.target.parentElement.parentElement.lastElementChild;
    targetTextArea.removeAttribute('disabled')
    event.target.classList.replace('fa-edit','fa-save')

    checked = false;
}

function saveFunc(event) {
    
    let newtargetTextArea = event.target.parentElement.parentElement.lastElementChild;
    newtargetTextArea.setAttribute('disabled',true)
    event.target.classList.replace('fa-save','fa-edit')
    checked = true;

    let newValue = newtargetTextArea.value;
    let index = +newtargetTextArea.id;

    let againNotesArr = JSON.parse(localStorage.getItem('notes'));
    againNotesArr.splice(index,1,newValue);jnhmjok
    localStorage.setItem('notes',JSON.stringify(againNotesArr));
    showNote()
}

        // delete method

    function deleteFunc(event) {    
        let newnewtargetTextArea = event.target.parentElement.parentElement.lastElementChild;
        let newIndex = +newnewtargetTextArea.id;
        let newNotesArr = JSON.parse(localStorage.getItem('notes'));
        newNotesArr.splice(newIndex,1);
        localStorage.setItem('notes',JSON.stringify(newNotesArr));
        showNote()
    }