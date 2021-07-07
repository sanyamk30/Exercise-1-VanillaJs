import { displayDataFromLocal, getTodaysDate, addInTable, blockDates, areDatesAvailable, saveInLocalStorage } from './scripts/helper.js';


let today = getTodaysDate();

// Setting the minimum value for start date
document.getElementById("startDate").setAttribute("min", today);


// Function to set the minimum value of end date according to the start date
function setEndDate(){
    let startDate = document.getElementById("startDate").value;
    document.getElementById("endDate").setAttribute("min",startDate);
}


function capitalize(a){
    return a.charAt(0).toUpperCase() + a.slice(1);
}

// Data Validation and corresponding function calls
function validateHelper(totalErrors , input){

    let errorClass = `${input}Error`;
    
    let val;
    if(input == 'gender'){
        if(document.getElementById('male').checked)
            val = 'MALE';
        else if(document.getElementById('female').checked)
            val = 'FEMALE';
    }
    else {
        val = document.getElementById(input).value;
    }

    let error = 0;
    document.getElementById(errorClass).innerHTML = '';

    if(val == null || val == ''){
        error = 1;
        document.getElementById(errorClass).innerHTML = `${input} can't be empty`;
    }
    else if(input == 'fname' || input == 'lname'){
        if(/^([a-zA-Z])+$/.test(val.trim()) === false){
            error = 1;
            document.getElementById(errorClass).innerHTML = `${input} can only contain letters`;
        }
    }

    return totalErrors + error;
    
}

function ValidationEventHandler(event){
    event.preventDefault();

    let fname = event.target.fname.value;
    let lname = event.target.lname.value;
    let startDate = event.target.startDate.value;
    let endDate = event.target.endDate.value;
    let gender = event.target.gender.value;
    let guests = parseInt(event.target.guests.value);
    let typeOfRoom = event.target.rooms.value;
  
    let inclusionsNode = event.target.inclusions;
    let inclusions = [];

    for(var i = 0; i < inclusionsNode.length; i++)  
    {  
        if(inclusionsNode[i].checked)  
            inclusions.push(inclusionsNode[i].value);
    }

    let inputs = ['fname','lname','gender','startDate','endDate','guests'];

    let errors = inputs.reduce(validateHelper,0);

    if(errors > 0)
        return false;

    fname = capitalize(fname);
    lname = capitalize(lname);
    typeOfRoom = capitalize(typeOfRoom);
    for(let i = 0;i<inclusions.length;i++){
        inclusions[i] = capitalize(inclusions[i]);
    }

    document.getElementById('endDateError').innerHTML = ``;
    
    if(areDatesAvailable(startDate,endDate)){
        blockDates(startDate,endDate);
    }
    else{
        document.getElementById('endDateError').innerHTML = `Selected dates are not available`;
        return false;
    }

    let startDateSplit = startDate.split('-').reverse();
    startDate = startDateSplit[0] + '-' + `0${startDateSplit[1]}` + '-' +  startDateSplit[2];

    let endDateSplit = endDate.split('-').reverse();
    endDate = endDateSplit[0] + '-' + `0${endDateSplit[1]}` + '-' +  endDateSplit[2];

    let id = document.getElementById('detailsTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;

    saveInLocalStorage({id,fname,lname,gender,startDate,endDate,guests,typeOfRoom,inclusions});

    return true;
}

function HandleGuestChange(event){
    let value = event.target.value;

    if(value < 0)
        document.getElementById('guests').value = 0;
    if(value > 10)
        document.getElementById('guests').value = 10;
    
}

function search(name){
    let index = name == 'fname' ? 1 : 2;

    let input = document.getElementById(`${name}Search`).value.toUpperCase();
    //console.log(input);
    let table = document.getElementById('detailsTable');

    let rows = table.getElementsByTagName('tr');



    for(let i = 0;i<rows.length;i++){
        let td = rows[i].getElementsByTagName('td')[index];
        //console.log(i,td);
        if(td){
            let text = td.textContent;
            if(text.toUpperCase().indexOf(input) > -1){
                rows[i].style.display = "";
            }
            else{
                rows[i].style.display = "none";
            }
        }
    }

} 


function searchUsingFname(){
    search('fname');

}

function searchUsingLname(){
    search('lname');

}

function handleClick(event){
    event.preventDefault();
    location.href = 'http://127.0.0.1:5500/pages/calendar.html';
    console.log(locatio.href);
}

// Event Listeners
window.addEventListener('load', function(){

    let form;
    form = document.getElementsByTagName('form')[0];

    displayDataFromLocal();

    form.addEventListener('submit', (event) => ValidationEventHandler(event));

    let checkButton = document.getElementById('checkAvailability').addEventListener('click',event => handleClick(event));
    let guestsField = this.document.getElementById('guests');
    guestsField.addEventListener('change',(event) => HandleGuestChange(event));
   
});

