function parse(sender){
    event.preventDefault()
    const form = sender.parentNode;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const formData = new FormData(form);
    const textarea = document.getElementById("JSON");
    const json = {};
    
    for (let [key, value] of formData.entries()) {
        if(key == "tag" || key == "piattaforme"){
            json[key] = value.split(",").map(item => item.trim());
        } else if(key == "Cross-Play"){
            json[key] = value === "on";
        } else {
            json[key] = value;
        }
    }
    
    delete json.JSON;
    textarea.value = JSON.stringify(json, null, 2); 
}