import Table from './table.js';
import EventEmitter from './util.js';
import { multiplyMatrix } from './matrix.js';

/* начальные размеры матриц 4x4 */
const table = new Table(4, 4, 4, 4);
/* Генерируем начальные матрицы */
table.insert();

// секция с элементами управления
const blockControl = document.querySelector('#l-control');
// вывод ошибок
const errorMatrix = document.querySelector('#l-error-matrix');
// переключение между матрицами A и B
const radioMatA = document.querySelector('#radio-matA');
// кнопки на боковой панели
const btn = document.querySelectorAll('.btn');

/* События */
const emitter = new EventEmitter();

emitter.on('error-matrix', data => {
	blockControl.classList.add('is-error');
	errorMatrix.innerText = data.textError;
});

emitter.on('valid-matrix', () => {
	blockControl.classList.remove('is-error');
	errorMatrix.innerText = '';
});

emitter.on('error-input', data => {
	data.input.classList.add('is-error'); // красная рамка
	data.input.focus(); // фокус всегда будет на инпуте пока не будет введено число
	blockControl.classList.remove('is-active');
	blockControl.classList.add('is-error');
	errorMatrix.innerText = data.textError;
	btn.forEach(button => button.setAttribute("disabled", "disabled"))
});

emitter.on('valid-input', () => {
	blockControl.classList.remove('is-error');
	blockControl.classList.remove('is-active');
	errorMatrix.innerText = '';
	btn.forEach(button => button.removeAttribute("disabled"))
});

/* Добавление строк */
document.querySelector('#add-tr').addEventListener('click', () => {
	if((table.trA + 1) <= 10 && (table.trB + 1) <= 10){
		if(radioMatA.checked){
			++table.trA;
		} else {
			++table.trB;
		}
		table.insert();
		emitter.emit('valid-matrix');
	} else {
		emitter.emit('error-matrix', {textError: "Число строк должно быть не больше 10"});
	}
	return false;
});

/* Удаление строк */
document.querySelector('#remove-tr').addEventListener('click', () => {
	if((table.trA - 1) >= 2 && (table.trB - 1) >= 2){
		if(radioMatA.checked){
			--table.trA;
		} else {
			--table.trB;
		}
		table.insert();
		emitter.emit('valid-matrix');
	} else {
		emitter.emit('error-matrix', {textError: "Число строк должно быть не меньше 2"});
	}
	return false;
});

/* Добавление столбцов */
document.querySelector('#add-td').addEventListener('click', () => {
	if((table.tdA + 1) <= 10 && (table.tdB + 1) <= 10){
		if(radioMatA.checked){
			++table.tdA;
		} else {
			++table.tdB;
		}
		table.insert();
		emitter.emit('valid-matrix');
	} else {
		emitter.emit('error-matrix', {textError: "Число столбцов должно быть не больше 10"});
	}
	return false;
});

/* Удаление столбцов */
document.querySelector('#remove-td').addEventListener('click', () => {
	if((table.tdA - 1) >= 2 && (table.tdB - 1) >= 2){
		if(radioMatA.checked){
			--table.tdA;
		} else {
			--table.tdB;
		}
		table.insert();
		emitter.emit('valid-matrix');
	} else {
		emitter.emit('error-matrix', {textError: "Число столбцов должно быть не меньше 10"});
	}
	return false;
});

/* Поменять матрицы местами */
document.querySelector('#swap-matrix').addEventListener("click", () => {
	if(table.trA == table.tdA && table.trB == table.tdB && table.trA == table.trB){
		let matrixVal = table.getValMatrix();
		table.insert();
		table.setValMatrix(matrixVal[0], 'matB');
		table.setValMatrix(matrixVal[1], 'matA');
		emitter.emit('valid-matrix');
	} else {
		emitter.emit('error-matrix', {textError: "Менять местами матрицы можно только одинакового размера с одинаковым числом строк и столбцов"})
	}
});

/* Перемножить матрицы */
document.querySelector('#mult-matrix').addEventListener("click", () => {
	if( table.tdA == table.trB ){
		let valMatrixAB = table.getValMatrix();
		let result = multiplyMatrix(valMatrixAB[0], valMatrixAB[1]);
		table.setValMatrix(result, 'matC');
		return true;
	} else {
		emitter.emit('error-matrix', {textError: "Число столбцов первой матрицы должно равняться числу строк второй матрицы"});
		return false;
	}
});

/* Очистить матрицы */
document.querySelector('#clean-matrix').addEventListener("click", () => {
	table.insert();
});

/* Делегирование событий для ввода значений матриц */
document.querySelector('.l-matrix').onclick = function(event) {
	let input = event.target.closest('input'); // (1)
	if (!input) return; // (2)
	blockControl.classList.add('is-active');
	validInput(input); // (4)
};

/*
	Подсветка колонки при фокусе на инпуте
	Валидация
	0. Должно быть введено целое число
	1. Число должно быть от -10 до 10
*/
function validInput(input) {
	input.oninput = function(){
		if (!Number.isInteger(Number(input.value))) { // введено не число
			emitter.emit('error-input', {input, textError: 'Введено не целое число' });
			return;
		}

		if(input.value < -10 || input.value > 10){
			emitter.emit('error-input', {input, textError: 'Число должно быть от -10 до 10' });
			return;
		}

		input.classList.remove('is-error'); // красная рамка
		emitter.emit('valid-input');
	};
}
