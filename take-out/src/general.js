const getDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //As January is 0.
    let yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return (yyyy + "-" + mm + "-" + dd);
};


//CHECK IF VALUE IS NUMBER
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

export {getDate, isNumeric, getRandomInt}