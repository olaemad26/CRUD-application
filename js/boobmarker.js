var bookName = document.getElementById("inputName");
var bookUrl = document.getElementById("inputUrl");
var btnsub = document.getElementById("btnSubmit");
var divContain = document.getElementById("divBody");
var alertMeg = document.getElementById("alertMeg");
var alertMeg2 = document.getElementById("alertMeg2");
var search = document.getElementById("search");
var inputs = document.getElementsByClassName("form-control");
var currentIndex = 0;
var bookArray = [];
if (JSON.parse(localStorage.getItem("bookstorage")) != null) {
    bookArray = JSON.parse(localStorage.getItem("bookstorage"));
    displayData();
}
btnsub.onclick = function () {
    if (btnsub.innerHTML == "submit") {
        saveData();
    }
    else {
        getUpdate();
        btnsub.innerHTML = "submit";
    }
    displayData();
    clearData();
}
function saveData() {
    var bookObj = {
        name: bookName.value,
        website: bookUrl.value
    }
    bookArray.push(bookObj);
    localStorage.setItem("bookstorage", JSON.stringify(bookArray));

}
function displayData() {
    var container = "";
    for (var i = 0; i < bookArray.length; i++) {
        container += `<div class="bground fw-bold ps-2 mb-3 row justify-content-start">
                        <div class="col-md-3">${bookArray[i].name}</div>
                        <div class="col-md-3">
                            <a href="${bookArray[i].website}"><button class="btn btn-primary ">Visit</button></a>
                            <button class="btn btn-warning" onclick=updateData(${i})>Update</button>
                            <button class="btn btn-danger " onclick="deleteData(${i})">Delete</button>
                        </div>    
                    </div>`;
    }
    divContain.innerHTML = container;
}
function clearData() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
function deleteData(index) {
    bookArray.splice(index, 1);
    displayData();
    localStorage.setItem("bookstorage", JSON.stringify(bookArray));
}
function updateData(index) {
    bookName.value = bookArray[index].name;
    bookUrl.value = bookArray[index].website;
    currentIndex = index;
    btnsub.innerHTML = "Update data";
}
function getUpdate() {
    var bookObj = {
        name: bookName.value,
        website: bookUrl.value
    }
    bookArray[currentIndex] = bookObj;
    localStorage.setItem("bookstorage", JSON.stringify(bookArray));

}
search.onkeyup = function () {
    var val = search.value;
    var container = "";
    for (var i = 0; i < bookArray.length; i++) {
        if (bookArray[i].name.toLowerCase().includes(val.toLowerCase())) {
            container += `<div class="bground fw-bold ps-2 mb-3 row justify-content-start">
            <div class="col-md-3">${bookArray[i].name}</div>
            <div class="col-md-3">
                <a href="${bookArray[i].website}"><button class="btn btn-primary ">Visit</button></a>
                <button class="btn btn-warning" onclick=updateData(${i})>Update</button>
                <button class="btn btn-danger " onclick="deleteData(${i})">Delete</button>
            </div>    
            </div>`;
        }

    }
    divContain.innerHTML = container;
}
bookName.onkeyup = function () {
    var nameRejex = /^[A-Z][a-z]{2,8}$/;
    var test1 = nameRejex.test(bookName.value);
    if (test1 == false) {
        // btnsub.disabled="true";
        bookName.classList.add("is-invalid");
        bookName.classList.remove("is-valid");
        alertMeg.classList.remove("d-none");

    }
    else {
        // btnsub.removeAttribute("disabled");
        bookName.classList.add("is-valid");
        bookName.classList.remove("is-invalid");
        alertMeg.classList.add("d-none");
    }

}
bookUrl.onkeyup = function () {
    urlRejex = /^www.[a-zA-Z]{4,20}.com$/;
    var test2 = urlRejex.test(bookUrl.value);
    if (test2 == false) {
        btnsub.disabled = "true";
        bookUrl.classList.add("is-invalid");
        bookUrl.classList.remove("ix-valid");
        alertMeg2.classList.remove("d-none");
    }
    else {
        btnsub.removeAttribute("disabled");
        bookUrl.classList.add("is-valid");
        bookUrl.classList.remove("is-invalid");
        alertMeg2.classList.add("d-none");
    }
}
