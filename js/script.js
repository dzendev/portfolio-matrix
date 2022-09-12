import { inserTable, getValMatrix, setValMatrix } from './table.js';
import EventEmitter from './util.js';
import { multiplyMatrix } from './matrix.js';

const emitter = new EventEmitter();

// секция с элементами управления
const blockControl = document.querySelector('#block-control');
// вывод ошибок
const errorMatrix = document.querySelector('#error-matrix');
// переключение между матрицами A и B
const radioMatA = document.querySelector('#radio-matA');
// кнопки на боковой панели
const btn = document.querySelectorAll('button');

/* События */
emitter.on('error-matrix', data => {
	blockControl.classList.add('error-mes');
	errorMatrix.innerText = data.textError;
});

emitter.on('valid-matrix', () => {
	blockControl.classList.remove('error-mes');
	errorMatrix.innerText = '';
});

emitter.on('error-input', data => {
	blockControl.classList.remove('focus-bg');
	blockControl.classList.add('error-mes');
	errorMatrix.innerText = data.textError;
	btn.forEach(button => button.setAttribute("disabled", "disabled"))
});

emitter.on('valid-input', () => {
	blockControl.classList.remove('error-mes');
	blockControl.classList.remove('focus-bg');
	errorMatrix.innerText = '';
	btn.forEach(button => button.removeAttribute("disabled"))
});

/* Размер матрицы */
let trA = 4;
let tdA = 4;
let trB = 4;
let tdB = 4;

/* Генерируем начальные матрицы */
inserTable(trA, tdA, trB, tdB);

/* Добавление строк */
document.querySelector('#add-tr').addEventListener('click', () => {
	if((trA + 1) >= 2 && (trA + 1) <= 10 && (trB + 1) >= 2 && (trB + 1) <= 10){
		if(radioMatA.checked){
			inserTable(++trA, tdA, trB, tdB);
		} else {
			inserTable(trA, tdA, ++trB, tdB);
		}
		emitter.emit('valid-matrix');
	} else {
		emitter.emit('error-matrix', {textError: "Число строк должно быть в диапазоне от 2 до 10"});
	}
	return false;
});

/* Удаление строк */
document.querySelector('#remove-tr').addEventListener('click', () => {
	if((trA - 1) >= 2 && (trA - 1) <= 10 && (trB - 1) >= 2 && (trB - 1) <= 10){
		if(radioMatA.checked){
			inserTable(--trA, tdA, trB, tdB);
		} else {
			inserTable(trA, tdA, --trB, tdB);
		}
		emitter.emit('valid-matrix');
	} else {
		emitter.emit('error-matrix', {textError: "Число строк должно быть в диапазоне от 2 до 10"});
	}
	return false;
});

/* Добавление столбцов */
document.querySelector('#add-td').addEventListener('click', () => {
	if((tdA + 1) >= 2 && (tdA + 1) <= 10 && (tdB + 1) >= 2 && (tdB + 1) <= 10){
		if(radioMatA.checked){
			inserTable(trA, ++tdA, trB, tdB);
		} else {
			inserTable(trA, tdA, trB, ++tdB);
		}
		emitter.emit('valid-matrix');
	} else {
		emitter.emit('error-matrix', {textError: "Число столбцов должно быть в диапазоне от 2 до 10"});
	}
	return false;
});

/* Удаление столбцов */
document.querySelector('#remove-td').addEventListener('click', () => {
	if((tdA - 1) >= 2 && (tdA - 1) <= 10 && (tdB - 1) >= 2 && (tdB - 1) <= 10){
		if(radioMatA.checked){
			inserTable(trA, --tdA, trB, tdB);
		} else {
			inserTable(trA, tdA, trB, --tdB);
		}
		emitter.emit('valid-matrix');
	} else {
		emitter.emit('error-matrix', {textError: "Число столбцов должно быть в диапазоне от 2 до 10"});
	}
	return false;
});

/* Поменять матрицы местами */
document.querySelector('#swap-matrix').addEventListener("click", () => {
	if(trA == tdA && trB == tdB && trA == trB){
		let matrixVal = getValMatrix();
		inserTable(trB, tdB, trA, tdA);
		setValMatrix(matrixVal[0], 'matB');
		setValMatrix(matrixVal[1], 'matA');
		emitter.emit('valid-matrix');
	} else {
		emitter.emit('error-matrix', {textError: "Менять местами матрицы можно только одинакового размера с одинаковым числом строк и столбцов"})
	}
});

/* Перемножить матрицы */
document.querySelector('#mult-matrix').addEventListener("click", () => {
	if( tdA == trB ){
		let valMatrixAB = getValMatrix();
		let result = multiplyMatrix(valMatrixAB[0], valMatrixAB[1]);
		setValMatrix(result, 'matC');
		return true;
	} else {
		emitter.emit('error-matrix', {textError: "Число столбцов первой матрицы должно равняться числу строк второй матрицы"});
		return false;
	}
});

/* Очистить матрицы */
document.querySelector('#clean-matrix').addEventListener("click", () => {
	inserTable(trA, tdA, trB, tdB);
});

/* Делегирование событий для ввода значений матриц */
document.querySelector('.block-matrix').onclick = function(event) {
	let input = event.target.closest('input'); // (1)
	if (!input) return; // (2)
	blockControl.classList.add('focus-bg');
	validInput(input); // (4)
};

/*
	Подсветка колонки при фокусе на инпуте
	Валидация
	0. Должно быть введено число
	1. Число должно быть от -10 до 10
*/
function validInput(input) {
	input.oninput = function(){
		if (isNaN(input.value)) { // введено не число
			input.classList.add('error-valid'); // красная рамка
			input.focus(); // фокус всегда будет на инпуте пока не будет введено число
			emitter.emit('error-input', {textError: 'Введено не число' });
			return;
		}

		if(input.value < -10 || input.value > 10){
			input.classList.add('error-valid'); // красная рамка
			input.focus(); // фокус всегда будет на инпуте пока не будет введено число
			emitter.emit('error-input', {textError: 'Число должно быть от -10 до 10' });
			return;
		}

		input.classList.remove('error-valid'); // красная рамка
		emitter.emit('valid-input', {textError: 'Число должно быть от -10 до 10' });
	};
}
