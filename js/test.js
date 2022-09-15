const mA = document.querySelector('#matA');
const mB = document.querySelector('#matB');

const generateMatrix = document.querySelector('#l-generate-matrix');
const div = document.createElement('div');
div.innerHTML = `<button class="btn" id="add-data" onclick="addData()">Добавить тестовые данные</button>`;
generateMatrix.append(div);

function addData() {
	mA.querySelectorAll('input').forEach(el => el.value = 4);
	mB.querySelectorAll('input').forEach(el => el.value = 5);
}