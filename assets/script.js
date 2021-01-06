// Scheduler Code
var scheduler = [
    {
        id: "0",
        hour: " 9",
        time: "09",
        meridiem: " a.m.",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: " a.m.",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: " a.m.",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: " p.m.",
        reminder: ""
    },
    {
        id: "4",
        hour: " 1",
        time: "13",
        meridiem: " p.m.",
        reminder: ""
    },
    {
        id: "5",
        hour: " 2",
        time: "14",
        meridiem: " p.m.",
        reminder: ""
    },
    {
        id: "6",
        hour: " 3",
        time: "15",
        meridiem: " p.m.",
        reminder: ""
    },
    {
        id: "7",
        hour: " 4",
        time: "16",
        meridiem: " p.m.",
        reminder: ""
    },
    {
        id: "8",
        hour: " 5",
        time: "17",
        meridiem: " p.m.",
        reminder: ""
    },
]

// Generates Visuals
scheduler.forEach(function(currentHour) {
// Rows
var hrRow = $("<form>").attr({
    "class": "row"
});
$(".container").append(hrRow);

// Time
var hrField = $("<div>")
    .text(`${currentHour.hour}${currentHour.meridiem}`)
    .attr({
        "class": "col-md-2 hour"
});

// Data
var hrPlanner = $("<div>")
    .attr({
        "class": "col-md-9 description p-0"
    });
var hrData = $("<textarea>");
hrPlanner.append(hrData);
hrData.attr("id", currentHour.id);
if (currentHour.time < moment().format("HH")) {
    hrData.attr ({
        "class": "past", 
    })
} else if (currentHour.time === moment().format("HH")) {
    hrData.attr({
        "class": "present"
    })
} else if (currentHour.time > moment().format("HH")) {
    hrData.attr({
        "class": "future"
    })
}
// Date
function headerDate() {
    var currentDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDate);
}
headerDate();

// Save Button
var saveBtn = $("<i class='far fa-save fa-lg'></i>")
var savePlanner = $("<button>")
    .attr({
        "class": "col-md-1 saveBtn"
});
savePlanner.append(saveBtn);
hrRow.append(hrField, hrPlanner, savePlanner);
})

// Saves data to LS and shows on screen
function saveToLS() {
    localStorage.setItem("scheduler", JSON.stringify(scheduler));
}
function showLS() {
    scheduler.forEach(function (currentTime) {
        $(`#${currentTime.id}`).val(currentTime.reminder);
    })
}
function initalize() {
    var today = JSON.parse(localStorage.getItem("scheduler"));
    if (today) {
        scheduler = today;
    }
    saveToLS();
    showLS();
}

// Saves any additions to LS 
initalize();
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveDataToLS = $(this).siblings(".description").children(".future").attr("id");
    scheduler[saveDataToLS].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveDataToLS);
    saveToLS();
    showLS();
})