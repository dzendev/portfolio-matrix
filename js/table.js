export default class Table {
	constructor (trA, trB, tdA, tdB) {
		this.trA = trA;
		this.trB = trB;
		this.tdA = tdA;
		this.tdB = tdB;
		this.matA = document.querySelector('#matA');
		this.matB = document.querySelector('#matB');
		this.matC = document.querySelector('#matC');
	}
	insert() {
		this.matA.innerHTML = this.#generate(this.trA, this.tdA, 'a');
		this.matB.innerHTML = this.#generate(this.trB, this.tdB, 'b');
		this.matC.innerHTML = this.#generate(this.trA, this.tdB, 'c');
	}
	#generate(tr, td, tableName) {
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
	getValMatrix() {
		const matrixAinput = document.querySelectorAll('#matA tr');
		const matrixBinput = document.querySelectorAll('#matB tr');
		let matrixA = [];
		let matrixB = [];
		for (let i = 0; i < this.trA; i++) {
			matrixA[i] = []
			for (let j = 0; j < this.tdA; j++) {
				// если значение будет равно пустой строке,
				// то во время умножения оно будет преобразовано
				// к числовому типу и станет равна 0
				// особенность javascript
				matrixA[i][j] = matrixAinput[i].querySelectorAll("input")[j].value;
			}
		}
		for (let i = 0; i < this.trB; i++) {
			matrixB[i] = []
			for (let j = 0; j < this.tdB; j++) {
				matrixB[i][j] = matrixBinput[i].querySelectorAll("input")[j].value;
			}
		}
		return [matrixA , matrixB];
	}
	setValMatrix(matrix, nameMatrix) {
		let matrixInput = document.querySelectorAll(`#${nameMatrix} tr`);
		if(nameMatrix == 'matC'){
			for (let i = 0; i < this.trA; i++) {
				for (let j = 0; j < this.tdB; j++) {
					matrixInput[i].querySelectorAll("input")[j].value = matrix[i][j];
				}
			}
		} else {
			if(nameMatrix == 'matA'){
				for (let i = 0; i < this.trA; i++) {
					for (let j = 0; j < this.tdA; j++) {
						matrixInput[i].querySelectorAll("input")[j].value = matrix[i][j];
					}
				}
			} else {
				for (let i = 0; i < this.trB; i++) {
					for (let j = 0; j < this.tdB; j++) {
						matrixInput[i].querySelectorAll("input")[j].value = matrix[i][j];
					}
				}
			}
		}
	}
}
