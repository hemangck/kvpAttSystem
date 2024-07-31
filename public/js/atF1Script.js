// Get today's date in DD-MM-YYYY format
const today = new Date();
const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

// Set the date value
document.getElementById('date').value = formattedToday;

// Function to get the week number of the month
const getMonthWeekNumber = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const pastDaysOfMonth = date.getDate() - 1; // days passed in the month
    return Math.ceil((pastDaysOfMonth + startOfMonth.getDay() + 1) / 7);
};

// Get the week number for today
const weekNumber = getMonthWeekNumber(today);
document.getElementById('week').value = weekNumber;


// Array of month names
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Get the month name for today
const monthName = monthNames[today.getMonth()];
document.getElementById('month').value = monthName;


// function to convert 24 hour format to 12 hour format
function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(':');
    let period = 'AM';
    let hour = parseInt(hours, 10);

    if (hour >= 12) {
        period = 'PM';
        if (hour > 12) {
            hour -= 12;
        }
    } else if (hour === 0) {
        hour = 12;
    }

    return `${String(hour).padStart(2, '0')}:${minutes} ${period}`;
}


// Function to set value to timeslot text field
function updateTimeSlot() {
    const sTime = document.getElementById('sTime').value;
    const eTime = document.getElementById('eTime').value;

    if (sTime && eTime) {
        const tSlot = document.getElementById('tSlot');
        tSlot.value = `${convertTo12HourFormat(sTime)} - ${convertTo12HourFormat(eTime)}`;
    }
}


document.getElementById('sTime').addEventListener('change', updateTimeSlot);
document.getElementById('eTime').addEventListener('change', updateTimeSlot);
