function show_hide() {
if(document.getElementById('check_est').checked) {
document.getElementById('formEst').style.display = "block";
    }
if (document.getElementById('check_doc').checked) {
    document.getElementById('formDoc').style.display = "block";    
    } 
if (document.getElementById('check_tut').checked){
document.getElementById('formTut').style.display = "block";
}
else{
    document.getElementById('formTut').style.display = "none";
    document.getElementById('formEst').style.display = "none";
    document.getElementById('formDoc').style.display = "none";
}
}
