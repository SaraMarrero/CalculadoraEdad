// Variables
const day = document.getElementById('inputDay');
const month = document.getElementById('inputMonth');
const year = document.getElementById('inputYear');

const errorDay = document.getElementById('errorDay');
const errorMonth = document.getElementById('errorMonth');
const errorYear = document.getElementById('errorYear');

const numDay = document.getElementById('numDays');
const numMonth = document.getElementById('numMonths');
const numYear = document.getElementById('numYears');

const button = document.getElementById('buttonEnviar');

let yearActual = new Date().getFullYear();
let arrayDia = [];
let meses = [
    {
        "1": 31,
        "2": 28,
        "3": 31,
        "4": 30,
        "5": 31,
        "6": 30,
        "7": 31,
        "8": 31,
        "9": 30,
        "01": 31,
        "02": 28,
        "03": 31,
        "04": 30,
        "05": 31,
        "06": 30,
        "07": 31,
        "08": 31,
        "09": 30,
        "10": 31,
        "11": 30,
        "12": 31,
    }
]

// Eventos
day.addEventListener('blur', validarDay);
month.addEventListener('blur', validarMonth);
year.addEventListener('blur', validarYear);
button.addEventListener('click', activarButton);

// Funciones - eventos
// Valida el campo del día
function validarDay(){
    // Comprueba que se rellene el campo del día
    if(day.value.length >= 1){
        // Comprueba que es un día válido
        if(arrayDia.toString() !== ''){
            if(day.value >= arrayDia.toString()){
                day.style.border = '1px solid hsl(0, 100%, 67%)';
                numDay.innerHTML = `<span id="numDay">- -</span>`;
                errorDay.textContent = 'Must be a valid day';
            } else{
                day.style.border = '1px solid hsl(0, 0%, 86%)';
                errorDay.textContent = '';
            }
        }
    } else{
        day.style.border = '1px solid hsl(0, 100%, 67%)';
        errorDay.textContent = 'This field is required';
    }
};

// Valida el campo del mes
function validarMonth(){
    // Comprueba que se rellene el campo del mes
    if(month.value.length >= 1){
        meses.forEach(e => {arrayDia.push(e[month.value])});

        // Comprueba que es un mes válido
        if(month.value < 1 || month.value > 12){
            month.style.border = '1px solid hsl(0, 100%, 67%)';
            errorMonth.textContent = 'Must be a valid month';
        } else{
            month.style.border = '1px solid hsl(0, 0%, 86%)';
            errorMonth.textContent = '';
        }
    } else{
        month.style.border = '1px solid hsl(0, 100%, 67%)';
        errorMonth.textContent = 'This field is required';
    }
};

// Valida el campo del año
function validarYear(){
    // Comprueba que se rellene el campo del año
    if(year.value.length >= 1){
        // Comprueba que es un año válido
        if(year.value > yearActual){
            year.style.border = '1px solid hsl(0, 100%, 67%)';
            errorYear.textContent = 'Must be a valid year';
        } else{
            year.style.border = '1px solid hsl(0, 0%, 86%)';
            errorYear.textContent = '';
        }
    } else{
        year.style.border = '1px solid hsl(0, 100%, 67%)';
        errorYear.textContent = 'This field is required';
    }
};

function calcularEdad(){
    // Obtiene la fecha actual y la de nacimiento
    let fechaActual = new Date();
    let fechaNacimiento = new Date(year.value, month.value - 1, day.value);

    // Calcula la diferencia en milisegundos entre las dos fechas
    let restaFechas = fechaActual - fechaNacimiento;

    // Pasa de milisegundos a años, meses y días
    let yearFinal = Math.floor(restaFechas / (1000 * 60 * 60 * 24 * 365.25));
    let monthFinal = Math.floor((restaFechas % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.4375));
    let dayFinal = Math.floor((restaFechas % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));

    // Se añade al html
    numDay.textContent = '';
    numDay.append(dayFinal);

    numMonth.textContent = '';
    numMonth.append(monthFinal);

    numYear.textContent = '';
    numYear.append(yearFinal);
}

// Comprueba que todo está correcto antes de mostrar el resultado
function activarButton(){

    if((year.value < yearActual) && (month.value > 1 || month.value < 12) && (day.value <= arrayDia.toString())){
        calcularEdad();
    } else{
        validarDay()
        validarMonth()
        validarYear()

        numDay.innerHTML = `<span id="numDay">- -</span>`;
        numMonth.innerHTML = `<span id="numMonth">- -</span>`;
        numYear.innerHTML = `<span id="numYears">- -</span>`;
    }
}
