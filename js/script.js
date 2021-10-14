import { multiplyMatrix } from './matrix.js';
import { inserTable, generateTable, validateMatrix, getValMatrix, setValMatrix } from './table.js';

// Матрицы
const matA = document.querySelector('#matA');
const matB = document.querySelector('#matB');
const matC = document.querySelector('#matC');

// секция с элементами управления
const blockControl = document.querySelector('#block-control');
// вывод ошибок
const errorMatrix = document.querySelector('#error-matrix');
// переключение между матрицами A и B
const radioMatA = document.querySelector('#radio-matA');

// размер матрицы
let trA = 4;
let tdA = 4;
let trB = 4;
let tdB = 4;

// генерируем начальные матрицы
inserTable(trA, tdA, trB, tdB);

// Добавление строк
const addTr = document.querySelector('#add-tr');
addTr.addEventListener('click', (event) => {
	if((trA + 1) >= 2 && (trA + 1) <= 10 && (trB + 1) >= 2 && (trB + 1) <= 10){
		// var matrixVal = getValMatrix();
		if(radioMatA.checked){
			inserTable(++trA, tdA, trB, tdB);
		} else {
			inserTable(trA, tdA, ++trB, tdB);
		}
		// setValMatrix(matrixVal[0], 'matA');
		// setValMatrix(matrixVal[1], 'matB');
		blockControl.classList.remove('error-mes');
		errorMatrix.innerText = '';
	} else {
		blockControl.classList.add('error-mes');
		errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
	}
	return false;
});

// Удаление строк
const removeTr = document.querySelector('#remove-tr'); // удалить строку
removeTr.addEventListener('click', (event) => {
	if((trA - 1) >= 2 && (trA - 1) <= 10 && (trB - 1) >= 2 && (trB - 1) <= 10){
		// var matrixVal = getValMatrix();
		if(radioMatA.checked){
			inserTable(--trA, tdA, trB, tdB);
		} else {
			inserTable(trA, tdA, --trB, tdB);
		}
		// setValMatrix(matrixVal[0], 'matA');
		// setValMatrix(matrixVal[1], 'matB');
		blockControl.classList.remove('error-mes');
		errorMatrix.innerText = '';
	} else {
		blockControl.classList.add('error-mes');
		errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
	}
	return false;
});

// Добавление столбцоы
const addTd = document.querySelector('#add-td');
addTd.addEventListener('click', (event) => {
	if((tdA + 1) >= 2 && (tdA + 1) <= 10 && (tdB + 1) >= 2 && (tdB + 1) <= 10){
		// var matrixVal = getValMatrix();
		if(radioMatA.checked){
			inserTable(trA, ++tdA, trB, tdB);
		} else {
			inserTable(trA, tdA, trB, ++tdB);
		}
		// setValMatrix(matrixVal[0], 'matA');
		// setValMatrix(matrixVal[1], 'matB');
		blockControl.classList.remove('error-mes');
		errorMatrix.innerText = '';
	} else {
		blockControl.classList.add('error-mes');
		errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
	}
	return false;
});
// Удаление столбцов
const removeTd = document.querySelector('#remove-td');
removeTd.addEventListener('click', (event) => {
	if((tdA - 1) >= 2 && (tdA - 1) <= 10 && (tdB - 1) >= 2 && (tdB - 1) <= 10){
		// var matrixVal = getValMatrix();
		if(radioMatA.checked){
			inserTable(trA, --tdA, trB, tdB);
		} else {
			inserTable(trA, tdA, trB, --tdB);
		}
		// setValMatrix(matrixVal[0], 'matA');
		// setValMatrix(matrixVal[1], 'matB');
		blockControl.classList.remove('error-mes');
		errorMatrix.innerText = '';
	} else {
		blockControl.classList.add('error-mes');
		errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
	}
	return false;
});

// перемножить матрицы
const multMatrix = document.querySelector('#mult-matrix');
multMatrix.addEventListener("click", (event) => {
	if( validateMatrix() ){
		var valMatrixAB = getValMatrix();
		var result = multiplyMatrix(valMatrixAB[0], valMatrixAB[1]);
		setValMatrix(result, 'matC');
		return true;
	}
});

// Очистить матрицы
const cleanMatrix = document.querySelector('#clean-matrix');
cleanMatrix.addEventListener("click", (event) => {
	inserTable(trA, tdA, trB, tdB);
});
/*
	Подсветка колонки при фокусе на инпуте
	Валидация
	1. Должно быть введено число
	2. Число должно быть от -10 до 10
*/
const btn = document.querySelectorAll('button');
const blockMatrix = document.querySelector('.block-matrix');

blockMatrix.onclick = function(event) {
	let input = event.target.closest('input'); // (1)
	// if(!event.target.contains('input')) return;j
	if (!input) return; // (2)
	highlight(input); // (4)
};

function highlight(input) {
	blockControl.classList.add('focus-bg');
	input.onblur = function(){
		if (isNaN(input.value)) { // введено не число
			input.classList.add('error-valid'); // красная рамка
			input.focus(); // фокус всегда будет на инпуте пока не будет введено число
			blockControl.classList.remove('focus-bg');
			blockControl.classList.add('error-mes');
			errorMatrix.innerText = 'Введено не число';
			// $('#mult-matrix').prop( "disabled", true );
			btn.forEach(button => button.setAttribute("disabled", "disabled"))
		} else {
			if(input.value >= -10 && input.value <=10){
				input.classList.remove('error-valid');
				blockControl.classList.remove('error-mes');
				blockControl.classList.remove('focus-bg');
				errorMatrix.innerText = '';
				// $('#mult-matrix').prop( "disabled", false );
				// $('button').prop( "disabled", false );
				btn.forEach(button => button.removeAttribute("disabled"))
			} else {
				input.classList.add('error-valid'); // красная рамка
				input.focus(); // фокус всегда будет на инпуте пока не будет введено число
				blockControl.classList.remove('focus-bg');
				blockControl.classList.add('error-mes');
				errorMatrix.innerText = 'Число должно быть от -10 до 10';
				// $('#mult-matrix').prop( "disabled", true );
				btn.forEach(button => button.setAttribute("disabled", "disabled"))
			}
		}
	};
}

// Поменять матрицы
const swapMatrix = document.querySelector('#swap-matrix'); // поменять матрицы местами
swapMatrix.addEventListener("click", (event) => {
	// Менять местами матрицы можно только одинакового размера с одинаковым числом строк и столбцов
	// if(trA == tdA && trB == tdB && trA == trB){
	// 	var matAHtml = $('#matA').html();
	// 	var matBHtml = $('#matB').html();
	// 	var matrixVal = getValMatrix();
	// 	$('#matA').html(matBHtml);
	// 	$('#matB').html(matAHtml);
	// 	setValMatrix(matrixVal[0], 'matB');
	// 	setValMatrix(matrixVal[1], 'matA');
	// } else {
	// 	$('#block-control').addClass('error-mes');
	// 	$('#error-matrix').text('Менять местами матрицы можно только одинакового размера с одинаковым числом строк и столбцов');
	// }
	var matrixVal = getValMatrix();
	inserTable(trB, tdB, trA, tdA);
	setValMatrix(matrixVal[0], 'matB');
	setValMatrix(matrixVal[1], 'matA');
	blockControl.classList.remove('error-mes');
	errorMatrix.innerText = '';
});
