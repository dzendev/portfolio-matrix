const mA = document.querySelector('#matA');
const mB = document.querySelector('#matB');
const btnAddData = document.querySelector('#add-data');

btnAddData.onclick = () => {
	mA.querySelectorAll('input').forEach(el => el.value = 4);
	mB.querySelectorAll('input').forEach(el => el.value = 4);
}