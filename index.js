/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

/* const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
} */

//----------Create Employee Record-----------

function employeeObjectTemplate(employeeArray){
    this.firstName = employeeArray[0],
    this.familyName = employeeArray[1],
    this.title = employeeArray[2],
    this.payPerHour = employeeArray[3],
    this.timeInEvents = [],
    this.timeOutEvents = []
}

function createEmployeeRecord (employeeArray) {
    return new employeeObjectTemplate(employeeArray);
}

function createEmployeeRecords (recordsIn){
    return recordsIn.map(createEmployeeRecord)
 }
//----------------createTimeInEvent----------------
 function createTimeInEvent(dateStamp){
     let dateStampArr = dateStamp.split(" ");
    let event = {
        type:"TimeIn",
        date:dateStampArr[0],
        hour:parseInt(dateStampArr[1]),
    }
    this.timeInEvents.push(event);
    return this;
}
//-----test stuff for TimeInEvent----
let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
let updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400");

//----------------createTimeOutEvent----------------

function createTimeOutEvent (dateStamp){
    let dateStampArr = dateStamp.split(" ");
    let event = {
        type:"TimeOut",
        date:dateStampArr[0],
        hour:parseInt(dateStampArr[1]),
    }
    this.timeOutEvents.push(event);
    return this;
}

//-----test stuff for TimeOutEvent----

let updatedBpRecordOut = createTimeOutEvent.call(bpRecord, "2015-02-28 1700");


//-------------hours Worked On Date----------
 function hoursWorkedOnDate(dateString){
    let timeIn;
    let timeOut;
    for (let i  of this.timeInEvents){
        if (i.date === dateString){
            timeIn=parseInt(i.hour)
        }
    }
    for (let i of this.timeOutEvents){
        if (i.date === dateString){
            timeOut=parseInt(i.hour)
        }
    }
    let hoursWorked = timeOut - timeIn;
    return hoursWorked/100;
 }

 //-------------------wagesEarnedOnDate---------

 function wagesEarnedOnDate(dateString){
    let hoursWorked = hoursWorkedOnDate.call(this, dateString);
    let wagesOwed = this.payPerHour*hoursWorked;
    return(wagesOwed);
 }

 //---------test for wagesEarnedOnDate-------
cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
 createTimeInEvent.call(cRecord, "2044-03-15 0900")
 createTimeOutEvent.call(cRecord, "2044-03-15 1100")
 //expect(wagesEarnedOnDate.call(cRecord, "2044-03-15")).to.equal(54)

 //--------all wages for--------
    function allWagesFor (){
    let totalwagesArr = [];
    for(let i of this.timeInEvents){
        totalwagesArr.push(wagesEarnedOnDate.call(this, i.date))
    }
        let x = totalwagesArr.reduce(
            (acc, elem)=>acc + elem, 0
        );
        return x;
} 
 

 //-------------find employee by first name---------
    function findEmployeeByFirstName(srcArray, fName){
        for (let i of srcArray){
            if (i.firstName === fName){
                return i;
            }
        }
    }
    
//-------------tests for find employee---------
/* let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
  ]
  let emps = createEmployeeRecords(src)
  let loki = findEmployeeByFirstName(emps, "Loki")
  //expect(loki.familyName).to.equal("Laufeysson-Odinsson") */

  //----------calculate payroll--------------
  function calculatePayroll(employeeArray){
      console.log(employeeArray)


      let sum=[];
        for (let i of employeeArray){
            sum.push(allWagesFor.call(i));
        }
        console.log(sum);
        let reducedSum=sum.reduce((acc, elem)=>acc+elem,0);
        return reducedSum;
  }
//------------test stuff-------------
const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-01 2300", "2018-01-02 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ]

let employeeRecords = createEmployeeRecords(csvDataEmployees)
            employeeRecords.forEach(function (rec) {
              let timesInRecordRow = csvTimesIn.find(function (row) {
                return rec.firstName === row[0]
              })

              let timesOutRecordRow = csvTimesOut.find(function (row) {
                return rec.firstName === row[0]
              })

              timesInRecordRow[1].forEach(function(timeInStamp){
                createTimeInEvent.call(rec, timeInStamp)
              })

              timesOutRecordRow[1].forEach(function(timeOutStamp){
                createTimeOutEvent.call(rec, timeOutStamp)
              })
            }) 
  
  