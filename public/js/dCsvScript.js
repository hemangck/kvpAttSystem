document.getElementById('downloadBtn').addEventListener('click', downloadCSV);

function downloadCSV() {
    // Define the data as an array of arrays
    const data = [
        ['Sname', 'SAddress', 'Caste', 'SubCaste', 'ContactNum', 'AadharNo', 'DOB', 'Taluka', 'Std', 'School', 'Class', 'Group', 'HOD', 'Supervisor', 'KishoriTai']
    ];

    // Convert data array to CSV string
    const csvContent = data.map(row => row.join(',')).join('\n');

    // Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a link element
    const link = document.createElement('a');

    // Create a URL for the Blob and set it as the href attribute
    const url = URL.createObjectURL(blob);
    link.href = url;

    // Set the download attribute with a filename
    link.download = 'template_file.csv';

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}
