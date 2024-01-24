const addbox = document.querySelector(".addbox");
const popupbox = document.querySelector(".popup-box");
const closeIcon=document.querySelector("header i");
const popup_mod = popupbox.querySelector("header p")
const descbox=popupbox.querySelector("textarea");
const titNote=popupbox.querySelector("input");
const addbtn = popupbox.querySelector(".addbtn");
const months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
const notes = JSON.parse(localStorage.getItem("notes")||"[]");
let is_updated = false,updateId;
addbox.addEventListener("click",()=>{
    titNote.focus();
    popupbox.classList.add("show");
});
closeIcon.addEventListener("click",()=>{
    titNote.value = "";
    descbox.value = "";
    popupbox.classList.remove("show");
});

function showNotes(){
    document.querySelectorAll(".note").forEach((note) => note.remove());
    notes.forEach((note,id) => {
    let noteList = `
<li class="note">
    <div class="details">
        <p class="">${note.title}</p>
        <span>${note.description}</span>
    </div>
    <div class="bottom-content">
        <span dir="ltr">${note.date}</span>
        <div class="settings">
            <i class="fa fa-ellipsis" onclick="showMenu(this)"></i>
            <ul class="menu">
                <li onclick="updateNotes('${note.title}','${note.description}','${id}')" >
                    <i class="fa fa-pen" ></i>تعديل
                </li>
                <li onclick="deleteNote(${id})">
                    <i  class="fa fa-trash"></i>حذف
                </li>
            </ul>
        </div>
    </div>
</li>`;
addbox.insertAdjacentHTML("afterend",noteList);
});
}
showNotes();
function updateNotes(title,desc,id){
    is_updated =true;
    updateId = id;
    addbox.click();
    titNote.value = title;
    descbox.value = desc;
    addbtn.innerText = "تأكيد التعديل";
    popup_mod.innerText = "تعديل الملاحظة ";

}
function deleteNote(index) {
    let confirmDel = confirm("Are you sure you want to delete?");
    if(!confirmDel) return; 
    notes.splice(index, 1);
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes();
 }
function showMenu(elem){
    elem.parentElement.classList.add("popmenu");
    document.addEventListener("click",e=>{
        if(e.target.tagName!= "I" || e.target !=elem){
            elem.parentElement.classList.remove("popmenu");
        }
    });

}

addbtn.addEventListener("click",e=>{
    e.preventDefault();
    let noteTit = titNote.value;
    let notedesc = descbox.value;
    if(noteTit||notedesc){
        let date = new Date();
        let month = months[date.getMonth()];
        let day =date.getDate();
        let year = date.getFullYear();
        let noteInfo = {
            title:noteTit,
            description:notedesc,
            date:`${day} ${month} ${year}`
        }
        if(!is_updated){
        notes.push(noteInfo);
        }
        else{
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes",JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});