const steps = document.querySelectorAll('.step');
const options = document.querySelectorAll('.option-btn');
const restartBtn = document.getElementById('restart-btn');

let userChoices = {
  budget: null,
  bodyType: null,
  country: null,
};

options.forEach(option => {
  option.addEventListener('click', () => {
    const step = option.closest('.step');
    const stepId = step.id;
    const value = option.dataset.value;

    // 사용자 선택 저장
    if (stepId === 'step-budget') userChoices.budget = value;
    else if (stepId === 'step-bodyType') userChoices.bodyType = value;
    else if (stepId === 'step-country') userChoices.country = value;

    // 현재 step 숨기고 다음 step 보여줌
    step.classList.remove('active');

    if (step.nextElementSibling) {
      step.nextElementSibling.classList.add('active');
    }

    if (stepId === 'step-country') {
      showResults();
    }
  });
});

restartBtn.addEventListener('click', () => {
  userChoices = { budget: null, bodyType: null, country: null };
  steps.forEach((step, idx) => {
    step.classList.toggle('active', idx === 0);
  });
  document.getElementById('result-container').innerHTML = '';
});

function filterCars() {
  return carDB.filter(car =>
    car.budget === userChoices.budget &&
    car.bodyType === userChoices.bodyType &&
    car.country === userChoices.country
  );
}

function showResults() {
  const resultContainer = document.getElementById('result-container');
  const filtered = filterCars();

  if (filtered.length === 0) {
    resultContainer.innerHTML = `<p>조건에 맞는 차량이 없습니다.</p>`;
  } else {
    resultContainer.innerHTML = filtered.map(car => `
      <div class="car-item">
        <img src="${car.image}" alt="${car.name}" />
        <p>${car.name} (${capitalize(car.country)})</p>
      </div>
    `).join('');
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}