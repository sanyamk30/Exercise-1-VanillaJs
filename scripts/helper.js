export function displayDataFromLocal(){

    let tbodyRef = document.getElementById('detailsTable').getElementsByTagName('tbody')[0];
   // console.log(tbodyRef);

    let details = JSON.parse(localStorage.getItem("details"));
    if(details === null)
        return;

    for(let detail of details){

        var newRow = tbodyRef.insertRow();

        for(let key in detail){
            var newCell = newRow.insertCell();
            var newText = document.createTextNode(detail[key]);
            newCell.appendChild(newText);
        }

    }
}

export function getTodaysDate(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10){
            dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

    today = yyyy+'-'+mm+'-'+dd;
    return today;
}

export function addInTable(obj){
    let tbodyRef = document.getElementById('detailsTable').getElementsByTagName('tbody')[0];

    var newRow = tbodyRef.insertRow();

    for(let key in obj){
        var newCell = newRow.insertCell();
        var newText = document.createTextNode(obj[key]);
        newCell.appendChild(newText);
    }
    return;

}

export function blockDates(startDate,endDate){
    let bookedDates = JSON.parse(localStorage.getItem("bookedDates"));

    if(bookedDates == null){
        bookedDates = {};
    }
    
    let start = new Date(startDate);
    let end = new Date(endDate);
    end.setDate(end.getDate() + 1);

    while(!(+start == +end)){
        //console.log(typeof start);
        //console.log(start);
        let year = start.getFullYear();
        let month = start.getMonth();
        let day = start.getDate();
        if(bookedDates[year]){
            if(bookedDates[year][month]){
                if(bookedDates[year][month][day]){
                    bookedDates[year][month][day] -= 1;
                }
                else {
                    bookedDates[year][month][day] = 0;
                }
            }
            else{
                bookedDates[year][month] = {};
                bookedDates[year][month][day] = 0;
            }
        }
        else{
            bookedDates[year] = {};
            bookedDates[year][month] = {};
            bookedDates[year][month][day] = 0;
        }
        start.setDate(start.getDate() + 1);
    }
    
    localStorage.setItem("bookedDates",JSON.stringify(bookedDates));

}

export function areDatesAvailable(startDate,endDate){
    let bookedDates = JSON.parse(localStorage.getItem("bookedDates"));

    //console.log("in avai;able");
    if(bookedDates == null){
        //console.log(bookedDates);
        return true;
    }
    else{
        let start = new Date(startDate);
        let end = new Date(endDate);
        end.setDate(end.getDate() + 1);

        // console.log(start);
        // console.log(end);
        while(!(+start == +end)){
            let year = start.getFullYear();
            let month = start.getMonth();
            let day = start.getDate();
            //console.log('In here');
            if(bookedDates[year]){
               // console.log('in year');
                if(bookedDates[year][month]){
                   // console.log('in month');
                    if(bookedDates[year][month][day] != undefined){
                       // console.log('in day');
                        return false;
                    }
                }
            }
            start.setDate(start.getDate() + 1);
        }
        return true;
    }
}

export function saveInLocalStorage(obj){

    let details = JSON.parse(localStorage.getItem("details"));
    if(details === null){
        details = [];   
    }
    
    details.push(obj);
    localStorage.setItem("details",JSON.stringify(details));

    // Add in table
   // blockDates(obj.startDate,obj.endDate);
    addInTable(obj);
    document.getElementsByTagName('form')[0].reset();

}