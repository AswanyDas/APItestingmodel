function validate() {
    if (form.API.value == "") {
        alert("Please provide valid API name!");
        document.myForm.API.focus();
        return false;
    }
    if (form.url.value == "") {
        alert("Please provide valid URL!");
        document.myForm.url.focus();
        return false;
    }
    if (form.schema.value == -1) {
        alert("Please select the schema!");
        document.myForm.schema.focus();
        return false;
    }
    let v = form.schema.value;
    console.log(v);
    if (v === "post" || v === "put" || v === "patch") {
        console.log(v);
        if (form.input.value == "") {
            alert("Please enter valid input!");
            document.myForm.input.focus();
            return false;
        }
    }
    return (true);
}
var selectedRow = null;
var arrlocalstore = new Array;
function onAPIsubmit() {
    storeformvaluesinlocalstorage();
}
function storeformvaluesinlocalstorage() {
    readlocalstoredvalues();
    arrlocalstore.push({
        API: form.API.value,
        url: form.url.value,
        schema: form.schema.value,
        input: form.input.value
    });
    localStorage.setItem("localData", JSON.stringify(arrlocalstore));
    getvaluesintablefromlocalstorage();

}
function readlocalstoredvalues() {
    var str = localStorage.getItem("localData");
    if (str != null) {

        arrlocalstore = JSON.parse(str);
        //  console.log(arrlocalstore);

    }

}
function getvaluesintablefromlocalstorage() {
    readlocalstoredvalues();
    var tbl = document.getElementById("mytbl");

    var row = tbl.insertRow();
    var apicell = row.insertCell();
    var urlcell = row.insertCell();
    var schemacell = row.insertCell();
    var inputcell = row.insertCell();
    var editcell = row.insertCell();

    for (let i = 0; i < arrlocalstore.length; i++) {
        apicell.innerHTML = arrlocalstore[i].API;
        urlcell.innerHTML = arrlocalstore[i].url;
        schemacell.innerHTML = arrlocalstore[i].schema;
        inputcell.innerHTML = arrlocalstore[i].input;
        editcell.innerHTML = `<a onClick= onEdit(arrlocalstore[${i}])>edit</a>
                            <a onClick= onDelete(arrlocalstore[${i}])>delete</a>`;
    }
}

function toprintlocalDatavalues() {
    readlocalstoredvalues();
    var tbl = document.getElementById("mytbl");
    for (let j = 0; j < arrlocalstore.length; j++) {

        let row = tbl.insertRow();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();
        let cell4 = row.insertCell();
        let cell5 = row.insertCell();
        cell1.innerHTML = arrlocalstore[j].API;
        cell2.innerHTML = arrlocalstore[j].url;
        cell3.innerHTML = arrlocalstore[j].schema;
        cell4.innerHTML = arrlocalstore[j].input;
        cell5.innerHTML = `<a onClick = onEdit(arrlocalstore[${j}])>edit</a>
                           <a onClick = onDelete(arrlocalstore[${j}])>delete</a>`;

    }

}
function checkDefault(arrlocalstore) {
    return arrlocalstore => {
        form.API.value;
        form.url.value;
        form.schema.value;
        form.input.value;

    }
}

function onEdit(rowdata) {
    let d = rowdata.API;
    console.log(d);
    form.API.value = rowdata.API;
    form.url.value = rowdata.url;
    form.schema.value = rowdata.schema;
    form.input.value = rowdata.input;
    onDelete(rowdata);
    //readlocalstoredvalues();
}
function onDelete(rowdata) {
    console.log(rowdata);
    let d = arrlocalstore.findIndex(checkDefault);
    console.log(d);
    arrlocalstore.splice(d, 1);
    console.log(arrlocalstore);
    localStorage.setItem("localData", JSON.stringify(arrlocalstore));
    readlocalstoredvalues();
    //toprintlocalDatavalues();


}

function deleteData() {
    localStorage.clear();

}
toprintlocalDatavalues();
var form = document.getElementById("myForm");
form.onsubmit = function (e) {
    e.preventDefault();
    validate();
    //storeformvaluesinlocalstorage();
    onAPIsubmit();

    // getvaluesintablefromlocalstorage();
    var s = form.schema.value;
    var u = form.url.value;
    var a = form.input.value;
    console.log(a);
    var choice = document.getElementById("schema").value;
    switch (choice) {
        case 'get':
            fetch(u, ['get'])
                .then(res => res.json())
                .then((data) => {
                    let x = JSON.stringify(data);
                    document.getElementById('output').innerHTML = x;
                })
            break;
        case 'post':
            let response = fetch(u, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset = utf-8'
                },
                body: a
            }).then(response => response.json())
                .then((data) => {
                    let y = JSON.stringify(data);
                    document.getElementById('output').innerHTML = y;
                })
            break;
        case 'put':
            let resp = fetch(u, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset = utf-8'
                },
                body: a
            }).then(resp => resp.json())
                .then((data) => {
                    console.log(data);
                    let y = JSON.stringify(data);
                    document.getElementById('output').innerHTML = y;
                })
            break;
        case 'patch':
            let respo = fetch(u, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset = utf-8'
                },
                body: a
            }).then(respo => respo.json())
                .then((data) => {
                    console.log(data);
                    let y = JSON.stringify(data);
                    document.getElementById('output').innerHTML = y;
                })
        case 'delete':
            fetch(u, {
                method: 'DELETE'
            }).then(respon => respon.json())
                .then((data) => {
                    console.log(data);
                    let y = JSON.stringify(data);
                    document.getElementById('output').innerHTML = y;

                })

        default:
            choice = 'null';

    }
    form.reset();
    //getvaluesintablefromlocalstorage();
}