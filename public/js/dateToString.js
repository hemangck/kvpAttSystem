document.getElementById('dobInput').addEventListener('change', function() {
    const date = new Date(this.value);
    const formattedDate = ("0" + date.getDate()).slice(-2) + "-" + 
                          ("0" + (date.getMonth() + 1)).slice(-2) + "-" + 
                          date.getFullYear();
    document.getElementById('dobH').value = formattedDate;
    document.getElementById('dateTxt').textContent = formattedDate;
});