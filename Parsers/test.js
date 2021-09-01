window.onload=function(){
    var fileInput = document.getElementById("csv"),

    readFile = function () {
        var reader = new FileReader();
        reader.onload = function () {
            document.getElementById('out').innerHTML = reader.result;
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsText(fileInput.files[0]);
        console.log(reader.result)
    };
    if(readFile){
        fileInput.addEventListener('change', readFile);
    }
  }


