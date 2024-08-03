document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[name="AttStatus"]');
    let presentCount = 0;
    let absentCount = checkboxes.length;
    document.getElementById('totalCount').textContent = checkboxes.length;
    document.getElementById('tCountH').value = checkboxes.length;

    checkboxes.forEach((checkbox) => {
        checkbox.checked = false; // Set default state to absent
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                presentCount++;
                absentCount--;
            } else {
                presentCount--;
                absentCount++;
            }
            document.getElementById('presentCount').textContent = presentCount;
            document.getElementById('absentCount').textContent = absentCount;

            document.getElementById('pCountH').value = presentCount;
            document.getElementById('aCountH').value = absentCount;

            updateHiddenField(); // Update hidden field when checkbox state changes
        });
    });

    function updateHiddenField() {
        const checkboxes = document.querySelectorAll('input[name="AttStatus"]');
        const attendanceData = [];
    
        const studentNameInputs = document.querySelectorAll('input[name="Sname"]');
        const studentStdInputs = document.querySelectorAll('input[name="Std"]');
        const sNamesArr = Array.from(studentNameInputs).map(input => input.value);
        const sStdArr = Array.from(studentStdInputs).map(input => input.value);
    
        checkboxes.forEach((checkbox, index) => {
            const studentName = sNamesArr[index];
            const studentStd = sStdArr[index];
    
            attendanceData.push({
                name: studentName,
                std: studentStd,
                status: checkbox.checked ? "present" : "absent"
            });
        });
    
        const hiddenField = document.getElementById('hiddenField');
        hiddenField.value = JSON.stringify({
            attendanceData // Ensure this is an array
        });
    }
    

    document.getElementById('attendanceForm').addEventListener('submit', updateHiddenField);
});
