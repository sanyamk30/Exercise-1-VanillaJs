
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

const bookedDates = JSON.parse(localStorage.getItem("bookedDates"));

function isDateAvailable(date){
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    if(bookedDates == null)
        return true;
    if(bookedDates[year]){
        if(bookedDates[year][month]){
            if(bookedDates[year][month][day] != undefined)
                return false;
        }
    }
    return true;
}

let today = new Date();
let yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
function createCalendar(month,year){
   
    let d = new Date(year,month);

    let table = '<table><tr><th>SUN</th><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th></tr><tr>';

    for(let i = 0;i<d.getDay();i++){
        table += '<td></td>';
    }
    while(d.getMonth() == month){
        //console.log(d);
        if(d.getDay() % 7 == 0)
            table += '</tr><tr>';
        if(d.getTime() < yesterday.getTime()){
            table += `<td class="grey">${d.getDate()}</td>`;
        }
        else if(isDateAvailable(d)){
            table += `<td class="green">${d.getDate()}</td>`;
        }
        else{
            table += `<td class="red">${d.getDate()}</td>`;
        }
        //table += `<td>${d.getDate()}</td>`;
        d.setDate(d.getDate() + 1);
    }

    if(d.getDay() != 0){
       // console.log(d.getDay());
        for(let i = d.getDay();i<7;i++){
            table += '<td></td>';
        }
    }
    table += '</tr></table>';

    return table;
}


let d = new Date();
let currMonth = d.getMonth();
let currYear = d.getFullYear();

document.getElementById('calendarTable').innerHTML = createCalendar(d.getMonth(),d.getFullYear());
document.getElementById('monthAndYear').innerText = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;

function previousButtonClick(event){
    if(currMonth == 0){
        currYear = currYear - 1;
        document.getElementById('calendarTable').innerHTML = createCalendar(11,currYear);
        currMonth = 11;
    }
    else{
        document.getElementById('calendarTable').innerHTML = createCalendar(currMonth-1,currYear);
        currMonth -= 1;
    }
    document.getElementById('monthAndYear').innerText = `${monthNames[currMonth]} ${currYear}`;
    
}

function nextButtonClick(event){
    if(currMonth == 11){
        currYear = currYear + 1;
        document.getElementById('calendarTable').innerHTML = createCalendar(0,currYear); 
        currMonth = 0;
    }
    else{
        document.getElementById('calendarTable').innerHTML = createCalendar(currMonth+1,currYear); 
        currMonth += 1;
    }  
    document.getElementById('monthAndYear').innerText = `${monthNames[currMonth]} ${currYear}`;

}


window.addEventListener('load',function(){
   
    let previousButton = document.getElementsByTagName('button')[0];
    let nextButton = document.getElementsByTagName('button')[1];

    previousButton.addEventListener('click',event => previousButtonClick());
    nextButton.addEventListener('click',event => nextButtonClick());

})

