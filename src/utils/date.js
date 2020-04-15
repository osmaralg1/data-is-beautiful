export function formatDateOnlyDate(dateString) {
    if (dateString === null || dateString === undefined) 
        return ""
    var d = new Date(dateString);
    var date = addZero(d.getDate(), 2);
    var month = addZero(d.getMonth() + 1, 2);

    var year = d.getFullYear()
    return date + "-" + month + "-" + year
    
}

function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

export function DateOnlyDate(dateString) {
    if (dateString === null || dateString === undefined) 
        return null
    var d = new Date(dateString);
    return d.getTime()
}