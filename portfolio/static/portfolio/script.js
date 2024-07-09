document.addEventListener('DOMContentLoaded', function() {
    var uploadForm = document.getElementById("uploadForm");
    if (uploadForm) {
        uploadForm.addEventListener("submit", function(event) {
            var fileInput = document.querySelector('input[type="file"]');
            if (fileInput && fileInput.files.length > 0) {
                var uploadedFile = fileInput.files[0];
                if (uploadedFile && uploadedFile.name.endsWith('.xlsx')) {
                    var workbook = new ExcelJS.Workbook();
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var data = new Uint8Array(e.target.result);
                        workbook.xlsx.load(data).then(function() {
                            var sheet = workbook.getWorksheet(1);
                            var maxColumns = sheet.actualColumnCount;
                            if (maxColumns > 2) {
                                alert("Only the first two columns will be compared. The third column and beyond will be ignored.");
                            }
                            uploadForm.submit(); // Submit the form
                        });
                    };
                    reader.readAsArrayBuffer(uploadedFile);
                    event.preventDefault(); // Prevent default form submission
                } else {
                    alert("Please upload a valid .xlsx file.");
                    event.preventDefault(); // Prevent default form submission
                }
            }
        });
    } else {
        console.error("Form element with id='uploadForm' not found.");
    }
});
