import { multiplyMatrix } from './matrix.js'

var trA, trB, tdA, tdB; // размеры матриц

const matA = document.querySelector('#matA');
const matB = document.querySelector('#matB');
const matC = document.querySelector('#matC');

// вставялем таблицы в html
function inserTable(itrA, itdA, itrB, itdB) {
	trA = itrA, tdA = itdA;
	trB = itrB, tdB = itdB;
	matA.innerHTML = generateTable(trA, tdA, 'a');
	matB.innerHTML = generateTable(trB, tdB, 'b');
	matC.innerHTML = generateTable(trA, tdB, 'c');
}

// генерация таблицы
function generateTable(tr, td, tableName) {
	var strTable = '<table>';
	for (var i = 0; i < tr; i++) {
		strTable += "<tr>";
		for (var j = 0; j < td; j++) {
			// s = i + j + 1;
			// strTable += '<td><input type="number" value="" placeholder="' + tableName + i + j + '" max="10" min="-10"'+ (tableName == 'c' ? ' disabled' : '') + '></td>';
			strTable += '<td><input type="text" value="" placeholder="' + tableName + i + j + '" ' + (tableName == 'c' ? ' disabled' : '') + '></td>';
		}
		 strTable += "</tr>";
	}
	return strTable += "</table>";
}
// Валидация перед умножением
function validateMatrix() {
	if(tdA == trB){
		return true;
	} else {
		blockControl.classList.add('error-mes');
		errorMatrix.innerText = 'Число столбцов первой матрицы должно равняться числу строк второй матрицы';
		return false;
	}
}
// Получить значение матриц
function getValMatrix() {
	const matrixAinput = document.querySelectorAll('#matA tr');
	const matrixBinput = document.querySelectorAll('#matB tr');
	var matrixA = [];
	var matrixB = [];
	var martixAB = [];
	for (var i = 0; i < trA; i++) {
		matrixA[i] = []
		for (var j = 0; j < tdA; j++) {
			// если значение будет равно пустой строке,
			// то во время умножения оно будет преобразовано
			// к числовому типу и станет равна 0
			// особенность javascript
			// matrixA[i][j] = $(matrixAinput).eq(i).find("input").eq(j).val();
			matrixA[i][j] = matrixAinput[i].querySelectorAll("input")[j].value;
		}
	}
	for (var i = 0; i < trB; i++) {
		matrixB[i] = []
		for (var j = 0; j < tdB; j++) {
			// matrixB[i][j] = $(matrixBinput).eq(i).find("input").eq(j).val();
			matrixB[i][j] = matrixBinput[i].querySelectorAll("input")[j].value;
		}
	}
	return martixAB = [matrixA , matrixB];
}
// Вывести результат умножения
function setValMatrix(matrix, nameMatrix) {
	// var matrixCinput = $('#matC tr');
	// var matrixInput = $('#' + nameMatrix + ' tr');
	var matrixInput = document.querySelectorAll(`#${nameMatrix} tr`);
	if(nameMatrix == 'matC'){
		for (var i = 0; i < trA; i++) {
			for (var j = 0; j < tdB; j++) {
				// $(matrixInput).eq(i).find("input").eq(j).val(matrix[i][j]);
				matrixInput[i].querySelectorAll("input")[j].value = matrix[i][j];
			}
		}
	} else {
		if(nameMatrix == 'matA'){
			for (var i = 0; i < trA; i++) {
				for (var j = 0; j < tdA; j++) {
					// $(matrixInput).eq(i).find("input").eq(j).val(matrix[i][j]);
					matrixInput[i].querySelectorAll("input")[j].value = matrix[i][j];
				}
			}
		} else {
			for (var i = 0; i < trB; i++) {
				for (var j = 0; j < tdB; j++) {
					// $(matrixInput).eq(i).find("input").eq(j).val(matrix[i][j]);
					matrixInput[i].querySelectorAll("input")[j].value = matrix[i][j];
				}
			}
		}
	}
}

// генерируем начальные матрицы
inserTable(4, 4, 4, 4);
/*
	Управление
*/
const blockControl = document.querySelector('#block-control');
const errorMatrix = document.querySelector('#error-matrix');
const radioMatA = document.querySelector('#radio-matA');

// Добавление строк
const addTr = document.querySelector('#add-tr');

addTr.addEventListener('click', (event) => {
	if(radioMatA.checked){
		trA++;
		if(trA >= 2 && trA <= 10){
			// var matrixVal = getValMatrix();
			inserTable(trA, tdA, trB, tdB);
			// setValMatrix(matrixVal[0], 'matA');
			// setValMatrix(matrixVal[1], 'matB');
			blockControl.classList.remove('error-mes');
			errorMatrix.innerText = '';
		} else {
			blockControl.classList.add('error-mes');
			errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
			trA--;
		}
	} else {
		trB++;
		if(trB >= 2 && trB <= 10){
			// var matrixVal = getValMatrix();
			inserTable(trA, tdA, trB, tdB);
			// setValMatrix(matrixVal[0], 'matA');
			// setValMatrix(matrixVal[1], 'matB');
			blockControl.classList.remove('error-mes');
			errorMatrix.innerText = '';
		} else {
			blockControl.classList.add('error-mes');
			errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
			trB--;
		}
	}
	return false;
});

// Удаление строк
const removeTr = document.querySelector('#remove-tr');

removeTr.addEventListener('click', (event) => {
	if(radioMatA.checked){
		trA--;
		if(trA >= 2 && trA <= 10){
			var matrixVal = getValMatrix();
			inserTable(trA, tdA, trB, tdB);
			setValMatrix(matrixVal[0], 'matA');
			setValMatrix(matrixVal[1], 'matB');
			blockControl.classList.remove('error-mes');
			errorMatrix.innerText = '';
		} else {
			blockControl.classList.add('error-mes');
			errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
			trA++;
		}
	} else {
		trB--;
		if(trB >= 2 && trB <= 10){
			var matrixVal = getValMatrix();
			inserTable(trA, tdA, trB, tdB);
			setValMatrix(matrixVal[0], 'matA');
			setValMatrix(matrixVal[1], 'matB');
			blockControl.classList.remove('error-mes');
			errorMatrix.innerText = '';
		} else {
			blockControl.classList.add('error-mes');
			errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
			trB++;
		}
	}

	return false;
});
// Добавление столбцоы
const addTd = document.querySelector('#add-td');

addTd.addEventListener('click', (event) => {
	if(radioMatA.checked){
		tdA++;
		if(tdA >= 2 && tdA <= 10){
			// var matrixVal = getValMatrix();
			inserTable(trA, tdA, trB, tdB);
			// setValMatrix(matrixVal[0], 'matA');
			// setValMatrix(matrixVal[1], 'matB');
			blockControl.classList.remove('error-mes');
			errorMatrix.innerText = '';
		} else {
			blockControl.classList.add('error-mes');
			errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
			tdA--;
		}
	} else {
		tdB++;
		if(tdB >= 2 && tdB <= 10){
			// var matrixVal = getValMatrix();
			inserTable(trA, tdA, trB, tdB);
			// setValMatrix(matrixVal[0], 'matA');
			// setValMatrix(matrixVal[1], 'matB');
			blockControl.classList.remove('error-mes');
			errorMatrix.innerText = '';
		} else {
			blockControl.classList.add('error-mes');
			errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
			tdB--;
		}
	}
	return false;
});
// Удаление столбцов
const removeTd = document.querySelector('#remove-td');

removeTd.addEventListener('click', (event) => {
	if(radioMatA.checked){
		tdA--;
		if(tdA >= 2 && tdA <= 10){
			var matrixVal = getValMatrix();
			inserTable(trA, tdA, trB, tdB);
			setValMatrix(matrixVal[0], 'matA');
			setValMatrix(matrixVal[1], 'matB');
			blockControl.classList.remove('error-mes');
			errorMatrix.innerText = '';
		} else {
			blockControl.classList.add('error-mes');
			errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
			tdA++;
		}
	} else {
		tdB--;
		if(tdB >= 2 && tdB <= 10){
			var matrixVal = getValMatrix();
			inserTable(trA, tdA, trB, tdB);
			setValMatrix(matrixVal[0], 'matA');
			setValMatrix(matrixVal[1], 'matB');
			blockControl.classList.remove('error-mes');
			errorMatrix.innerText = '';
		} else {
			blockControl.classList.add('error-mes');
			errorMatrix.innerText = 'Число столбцов и строк должно быть в диапазоне от 2 до 10';
			tdB++;
		}
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
const swapMatrix = document.querySelector('#swap-matrix');

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
