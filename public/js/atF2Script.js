document.addEventListener('DOMContentLoaded', () => {
    const classCBoxes = document.querySelectorAll('input[name="classCheck"]');
    const toggleSwitches = document.querySelectorAll('input[name="AttStatus"]');
    let totalCount = 0;
    let presentCount = 0;
    let absentCount = 0;

    classCBoxes.forEach((checkbox, index) => {
        const toggleSwitch = toggleSwitches[index];
        toggleSwitch.disabled = true; // Initially disable all toggle switches

        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                toggleSwitch.disabled = false; // Enable the associated toggle switch
                totalCount++;
                absentCount++; // Initially consider as absent
                document.getElementById('classH').value = document.getElementById('sClass').value;
            } else {
                if (!toggleSwitch.disabled) {
                    if (toggleSwitch.checked) {
                        presentCount--;
                    } else {
                        absentCount--;
                    }
                    totalCount--;
                }
                toggleSwitch.disabled = true; // Disable the associated toggle switch
            }

            updateCounts();
        });

        toggleSwitch.addEventListener('change', function() {
            if (toggleSwitch.checked) {
                presentCount++;
                absentCount--;
            } else {
                presentCount--;
                absentCount++;
            }
            updateCounts();
        });
    });

    function updateCounts() {
        document.getElementById('totalCount').textContent = totalCount;
        document.getElementById('presentCount').textContent = presentCount;
        document.getElementById('absentCount').textContent = absentCount;

        document.getElementById('tCountH').value = totalCount;
        document.getElementById('pCountH').value = presentCount;
        document.getElementById('aCountH').value = absentCount;

        updateHiddenField(); // Update hidden field when counts change
    }

    function updateHiddenField() {
        const attendanceData = [];
        const studentNameInputs = document.querySelectorAll('input[name="Sname"]');
        const studentStdInputs = document.querySelectorAll('input[name="Std"]');

        studentNameInputs.forEach((input, index) => {
            if (!classCBoxes[index].checked) return; // Skip unchecked checkboxes

            const studentName = input.value;
            const studentStd = studentStdInputs[index].value;
            const status = toggleSwitches[index].checked ? "present" : "absent";

            attendanceData.push({
                name: studentName,
                std: studentStd,
                status: status
            });
        });

        const hiddenField = document.getElementById('hiddenField');
        hiddenField.value = JSON.stringify({
            attendanceData: attendanceData
        });
    }

    document.getElementById('attendanceForm').addEventListener('submit', updateHiddenField);
});