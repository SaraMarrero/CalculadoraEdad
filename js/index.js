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
button.disabled = true;

// Eventos
button.addEventListener('click', calcularEdad);

// Valida el campo del día
day.addEventListener('blur', () => {
    if(day.value.length >= 1){
        if(day.value < 1 || day.value > 31){
            day.style.border = '1px solid hsl(0, 100%, 67%)';
            errorDay.textContent = 'Must be a valid day';
        } else{
            day.style.border = '1px solid hsl(0, 0%, 86%)';
            errorDay.textContent = '';
            activarButton();
        }
    } else{
        day.style.border = '1px solid hsl(0, 100%, 67%)';
        errorDay.textContent = 'This field is required';
    }
});

// Valida el campo del mes
month.addEventListener('blur', () => {
    if(month.value.length >= 1){
        if(month.value < 1 || month.value > 12){
            month.style.border = '1px solid hsl(0, 100%, 67%)';
            errorMonth.textContent = 'Must be a valid month';
        } else{
            month.style.border = '1px solid hsl(0, 0%, 86%)';
            errorMonth.textContent = '';
            activarButton();
        }
    } else{
        month.style.border = '1px solid hsl(0, 100%, 67%)';
        errorMonth.textContent = 'This field is required';
    }
});

// Valida el campo del año
year.addEventListener('blur', () => {
    let yearActual = new Date().getFullYear();

    if(year.value.length >= 1){
        if(year.value > yearActual){
            year.style.border = '1px solid hsl(0, 100%, 67%)';
            errorYear.textContent = 'Must be a valid year';
        } else{
            year.style.border = '1px solid hsl(0, 0%, 86%)';
            errorYear.textContent = '';
            activarButton();
        }
    } else{
        year.style.border = '1px solid hsl(0, 100%, 67%)';
        errorYear.textContent = 'This field is required';
    }
});

// Funciones
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

function activarButton(){
    if(year.value.length >= 1 && month.value >= 1 && day.value >= 1){
        button.disabled = false;
    } else{
        button.disabled = true;
    }
}