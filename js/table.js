let trA, trB, tdA, tdB; // размеры матриц

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
	let strTable = '<table>';
	for (let i = 0; i < tr; i++) {
		strTable += "<tr>";
		for (let j = 0; j < td; j++) {
			strTable += '<td><input type="text" value="" placeholder="' + tableName + i + j + '" ' + (tableName == 'c' ? ' disabled' : '') + '></td>';
		}
		 strTable += "</tr>";
	}
	return strTable += "</table>";
}

// Получить значение матриц
export function getValMatrix() {
	const matrixAinput = document.querySelectorAll('#matA tr');
	const matrixBinput = document.querySelectorAll('#matB tr');
	let matrixA = [];
	let matrixB = [];
	let martixAB = [];
	for (let i = 0; i < trA; i++) {
		matrixA[i] = []
		for (let j = 0; j < tdA; j++) {
			// если значение будет равно пустой строке,
			// то во время умножения оно будет преобразовано
			// к числовому типу и станет равна 0
			// особенность javascript
			matrixA[i][j] = matrixAinput[i].querySelectorAll("input")[j].value;
		}
	}
	for (let i = 0; i < trB; i++) {
		matrixB[i] = []
		for (let j = 0; j < tdB; j++) {
			matrixB[i][j] = matrixBinput[i].querySelectorAll("input")[j].value;
		}
	}
	return martixAB = [matrixA , matrixB];
}

// Вывести результат умножения
export function setValMatrix(matrix, nameMatrix) {
	let matrixInput = document.querySelectorAll(`#${nameMatrix} tr`);
	if(nameMatrix == 'matC'){
		for (let i = 0; i < trA; i++) {
			for (let j = 0; j < tdB; j++) {
				matrixInput[i].querySelectorAll("input")[j].value = matrix[i][j];
			}
		}
	} else {
		if(nameMatrix == 'matA'){
			for (let i = 0; i < trA; i++) {
				for (let j = 0; j < tdA; j++) {
					matrixInput[i].querySelectorAll("input")[j].value = matrix[i][j];
				}
			}
		} else {
			for (let i = 0; i < trB; i++) {
				for (let j = 0; j < tdB; j++) {
					matrixInput[i].querySelectorAll("input")[j].value = matrix[i][j];
				}
			}
		}
	}
}
