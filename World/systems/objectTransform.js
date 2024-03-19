function saveObjectLocation(object){

    const nameX = object.id + ".position.x";
    const nameY = object.id + ".position.y";
    const nameZ = object.id + ".position.z";
    localStorage.setItem(nameX,object.position.x);
    localStorage.setItem(nameY,object.position.y);
    localStorage.setItem(nameZ,object.position.z);

}

function loadObjectLocation(object){
    if(localStorage.getItem("currentID") == object.id){ 
    const nameX = object.id + ".position.x";
    const nameY = object.id + ".position.y";
    const nameZ = object.id + ".position.z";   

    object.position.set(parseFloat(localStorage.getItem(nameX)),parseFloat(localStorage.getItem(nameY)),parseFloat(localStorage.getItem(nameZ)));}
    else {
        const nameX = localStorage.getItem("currentID")+".position.x";
        const nameY = localStorage.getItem("currentID")+".position.y";
        const nameZ = localStorage.getItem("currentID")+".position.z";
    }

}

function clearObjectLocation(object){
    localStorage.setItem("object.position.x",0);
    localStorage.setItem("object.position.y",0);
    localStorage.setItem("object.position.z",0);
}
function saveObjectID(object){
    localStorage.setItem("currentID", object.id);

}

function getPositionSum(){
    const nameX = object.id + ".position.x";
    const nameY = object.id + ".position.y";
    const nameZ = object.id + ".position.z";
    const sum = parseFloat(localStorage.getItem(nameX))+parseFloat(localStorage.getItem(nameY))+parseFloat(localStorage.getItem(nameZ)); 
    return parseFloat(localStorage.getItem(nameX));
}
export {saveObjectLocation, loadObjectLocation,clearObjectLocation, saveObjectID, getPositionSum};