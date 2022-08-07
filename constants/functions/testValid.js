export const testValid = ( data) => {
    let valid = false;
    for(let i = 0; i< data.length; i++){
        console.log(data[i])
        if(data[i].leftovers > 0 &&
            data[i].name.length > 0 &&
            data[i].price > 0 &&
            data[i].group.length > 0 &&
            data[i].measurement.length > 0 &&
            data[i].id.length > 0){
                valid = true 
            } else {
                return false
            }
    }
    return valid
};
