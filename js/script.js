import { multiplyMatrix } from './matrix.js'

var trA, trB, tdA, tdB; // размеры матриц

// вставялем таблицы в html
function inserTable(itrA, itdA, itrB, itdB) {
	trA = itrA, tdA = itdA;
	trB = itrB, tdB = itdB;
	$('#matA').html(generateTable(trA, tdA, 'a'));
	$('#matB').html(generateTable(trB, tdB, 'b'));
	$('#matC').html(generateTable(trA, tdB, 'c'));
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
		$('#block-control').addClass('error-mes');
		$('#error-matrix').text('Число столбцов первой матрицы должно равняться числу строк второй матрицы');
		return false;
	}
}
// Получить значение матриц
function getValMatrix() {
	var matrixAinput = $('#matA tr');
	var matrixBinput = $('#matB tr');
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
			matrixA[i][j] = $(matrixAinput).eq(i).find("input").eq(j).val();
		}
	}
	for (var i = 0; i < trB; i++) {
		matrixB[i] = []
		for (var j = 0; j < tdB; j++) {
			matrixB[i][j] = $(matrixBinput).eq(i).find("input").eq(j).val();
		}
	}
	return martixAB = [matrixA , matrixB];
}
// Вывести результат умножения
function setValMatrix(matrix, nameMatrix) {
	// var matrixCinput = $('#matC tr');
	var matrixInput = $('#' + nameMatrix + ' tr');
	if(nameMatrix == 'matC'){
		for (var i = 0; i < trA; i++) {
			for (var j = 0; j < tdB; j++) {
				$(matrixInput).eq(i).find("input").eq(j).val(matrix[i][j]);
			}
		}
	} else {
		if(nameMatrix == 'matA'){
			for (var i = 0; i < trA; i++) {
				for (var j = 0; j < tdA; j++) {
					$(matrixInput).eq(i).find("input").eq(j).val(matrix[i][j]);
				}
			}
		} else {
			for (var i = 0; i < trB; i++) {
				for (var j = 0; j < tdB; j++) {
					$(matrixInput).eq(i).find("input").eq(j).val(matrix[i][j]);
				}
			}
		}
	}
}

$(document).ready(function() {
	// генерируем начальные матрицы
	inserTable(4, 4, 4, 4);
	/*
		Управление
	*/
	// Добавление строк
	$('#add-tr').click(function() {
		if($('#radio-matA').is( ":checked" )){
			trA++;
			if(trA >= 2 && trA <= 10){
				var matrixVal = getValMatrix();
				inserTable(trA, tdA, trB, tdB);
				setValMatrix(matrixVal[0], 'matA');
				setValMatrix(matrixVal[1], 'matB');
				$('#block-control').removeClass('error-mes');
				$('#error-matrix').text('');
			} else {
				$('#block-control').addClass('error-mes');
				$('#error-matrix').text('Число столбцов и строк должно быть в диапазоне от 2 до 10');
				trA--;
			}
		} else {
			trB++;
			if(trB >= 2 && trB <= 10){
				var matrixVal = getValMatrix();
				inserTable(trA, tdA, trB, tdB);
				setValMatrix(matrixVal[0], 'matA');
				setValMatrix(matrixVal[1], 'matB');
				$('#block-control').removeClass('error-mes');
				$('#error-matrix').text('');
			} else {
				$('#block-control').addClass('error-mes');
				$('#error-matrix').text('Число столбцов и строк должно быть в диапазоне от 2 до 10');
				trB--;
			}
		}
		return false;
	});
	// Удаление строк
	$('#remove-tr').click(function() {
		if($('#radio-matA').is( ":checked" )){
			trA--;
			if(trA >= 2 && trA <= 10){
				var matrixVal = getValMatrix();
				inserTable(trA, tdA, trB, tdB);
				setValMatrix(matrixVal[0], 'matA');
				setValMatrix(matrixVal[1], 'matB');
				$('#block-control').removeClass('error-mes');
				$('#error-matrix').text('');
			} else {
				$('#block-control').addClass('error-mes');
				$('#error-matrix').text('Число столбцов и строк должно быть в диапазоне от 2 до 10');
				trA++;
			}
		} else {
			trB--;
			if(trB >= 2 && trB <= 10){
				var matrixVal = getValMatrix();
				inserTable(trA, tdA, trB, tdB);
				setValMatrix(matrixVal[0], 'matA');
				setValMatrix(matrixVal[1], 'matB');
				$('#block-control').removeClass('error-mes');
				$('#error-matrix').text('');
			} else {
				$('#block-control').addClass('error-mes');
				$('#error-matrix').text('Число столбцов и строк должно быть в диапазоне от 2 до 10');
				trB++;
			}
		}

		return false;
	});
	// Добавление столбцоы
	$('#add-td').click(function() {
		if($('#radio-matA').is( ":checked" )){
			tdA++;
			if(tdA >= 2 && tdA <= 10){
				var matrixVal = getValMatrix();
				inserTable(trA, tdA, trB, tdB);
				setValMatrix(matrixVal[0], 'matA');
				setValMatrix(matrixVal[1], 'matB');
				$('#block-control').removeClass('error-mes');
				$('#error-matrix').text('');
			} else {
				$('#block-control').addClass('error-mes');
				$('#error-matrix').text('Число столбцов и строк должно быть в диапазоне от 2 до 10');
				tdA--;
			}
		} else {
			tdB++;
			if(tdB >= 2 && tdB <= 10){
				var matrixVal = getValMatrix();
				inserTable(trA, tdA, trB, tdB);
				setValMatrix(matrixVal[0], 'matA');
				setValMatrix(matrixVal[1], 'matB');
				$('#block-control').removeClass('error-mes');
				$('#error-matrix').text('');
			} else {
				$('#block-control').addClass('error-mes');
				$('#error-matrix').text('Число столбцов и строк должно быть в диапазоне от 2 до 10');
				tdB--;
			}
		}
		return false;
	});
	// Удаление столбцов
	$('#remove-td').click(function() {
		if($('#radio-matA').is( ":checked" )){
			tdA--;
			if(tdA >= 2 && tdA <= 10){
				var matrixVal = getValMatrix();
				inserTable(trA, tdA, trB, tdB);
				setValMatrix(matrixVal[0], 'matA');
				setValMatrix(matrixVal[1], 'matB');
				$('#block-control').removeClass('error-mes');
				$('#error-matrix').text('');
			} else {
				$('#block-control').addClass('error-mes');
				$('#error-matrix').text('Число столбцов и строк должно быть в диапазоне от 2 до 10');
				tdA++;
			}
		} else {
			tdB--;
			if(tdB >= 2 && tdB <= 10){
				var matrixVal = getValMatrix();
				inserTable(trA, tdA, trB, tdB);
				setValMatrix(matrixVal[0], 'matA');
				setValMatrix(matrixVal[1], 'matB');
				$('#block-control').removeClass('error-mes');
				$('#error-matrix').text('');
			} else {
				$('#block-control').addClass('error-mes');
				$('#error-matrix').text('Число столбцов и строк должно быть в диапазоне от 2 до 10');
				tdB++;
			}
		}
		return false;
	});
	// перемножить матрицы
	$('#mult-matrix').click(function() {
		if( validateMatrix() ){
			var valMatrixAB = getValMatrix();
			var result = multiplyMatrix(valMatrixAB[0], valMatrixAB[1]);
			setValMatrix(result, 'matC');
			return true;
		}
	});
	// Очистить матрицы
	$('#clean-matrix').click(function(){
		inserTable(trA, tdA, trB, tdB);
	});
	/*
		Подсветка колонки при фокусе на инпуте
		Валидация
		1. Должно быть введено число
		2. Число должно быть от -10 до 10
	*/
	$(document).on('focus', 'input[type=text]', function(){
		$('#block-control').addClass('focus-bg');
		$(this).blur(function(){
			if (isNaN(this.value)) { // введено не число
				$(this).addClass('error-valid'); // красная рамка
				$(this).focus(); // фокус всегда будет на инпуте пока не будет введено число
				$('#block-control').removeClass('focus-bg');
				$('#block-control').addClass('error-mes');
				$('#error-matrix').text('Введено не число');
				// $('#mult-matrix').prop( "disabled", true );
				$('button').prop( "disabled", true );
			} else {
				if(this.value >= -10 && this.value <=10){
					$(this).removeClass('error-valid');
					$('#block-control').removeClass('error-mes');
					$('#block-control').removeClass('focus-bg');
					$('#error-matrix').text('');
					// $('#mult-matrix').prop( "disabled", false );
					$('button').prop( "disabled", false );
				} else {
					$(this).addClass('error-valid'); // красная рамка
					$(this).focus(); // фокус всегда будет на инпуте пока не будет введено число
					$('#block-control').removeClass('focus-bg');
					$('#block-control').addClass('error-mes');
					$('#error-matrix').text('Число должно быть от -10 до 10');
					// $('#mult-matrix').prop( "disabled", true );
					$('button').prop( "disabled", true );
				}
			}
		});
	});
	// Поменять матрицы
	$('#swap-matrix').click(function() {
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
				$('#block-control').removeClass('error-mes');
				$('#error-matrix').text('');
	});
});