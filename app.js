const sel = document.getElementById("tag");
const arrTags = "Action,Adventure,Building,Challenging,Choices,Co-op,Combat,Competitive,Cozy,Crafting,Creative,Exploration,Farming,First-person,Football,Hero shooter,Indie,Multiplayer,Open-world,Party,Physics,Platformer,Precision-platforming,Puzzle,Replayability,Roguelike,Rpg,Sandbox,Shooter,Simulation,Singleplayer,Social,Social deduction,Soulslike,Sports,Story-driven,Strategy,Survival,Team-based,Turn-based".split(",");

arrTags.forEach(tag =>{
    sel.innerHTML += `<input type="checkbox" id="${tag}" name="tag" value="${tag}">\n<label for="${tag}">${tag}</label><br>`;
})




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

    const tagCheckboxes = form.querySelectorAll('input[name="tag"]:checked');
    const tagArray = Array.from(tagCheckboxes).map(cb => cb.value);
    
    for (let [key, value] of formData.entries()) {
        if(key == "piattaforme"){
            json[key] = value.split(",").map(item => item.trim());
        } else if(key === "tag"){
            json[key] = null;
        } else if(key == "imgPath"){
            value = "img/" + value + ".jpeg";
            json[key] = value;
        } else{
            json[key] = value;
        }
    }
    
    json["tag"] = tagArray;

    json["crossPlay"] = formData.has("crossPlay");
    
    delete json.JSON;
    textarea.value = JSON.stringify(json, null, 2); 
}