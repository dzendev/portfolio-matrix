let trA, trB, tdA, tdB; // размеры матриц
// размеры матриц
// export let trA;
// export let trB;
// export let tdA;
// export let tdB;

// вставялем таблицы в html
export function inserTable(itrA, itdA, itrB, itdB) {
	trA = itrA, tdA = itdA;
	trB = itrB, tdB = itdB;
	matA.innerHTML = generateTable(trA, tdA, 'a');
	matB.innerHTML = generateTable(trB, tdB, 'b');
	matC.innerHTML = generateTable(trA, tdB, 'c');
}

// генерация таблицы
export function generateTable(tr, td, tableName) {
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
export function validateMatrix() {
	if(tdA == trB){
		return true;
	} else {
		blockControl.classList.add('error-mes');
		errorMatrix.innerText = 'Число столбцов первой матрицы должно равняться числу строк второй матрицы';
		return false;
	}
}

// Получить значение матриц
export function getValMatrix() {
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
export function setValMatrix(matrix, nameMatrix) {
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
