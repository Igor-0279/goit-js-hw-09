import Notiflix from 'notiflix';

const timeInputFields = ['delay', 'step', 'amount'];

const shouldResolve = () => Math.random() > 0.5;

const getinputValues = timeInputFields => {
  return timeInputFields.map(
    timeInputField => +document.querySelector(`input[name= "${timeInputField}"]`).value
  );
};

document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const [delay, step, amount] = getinputValues(timeInputFields);
  Array.from({ length: amount }).forEach((p, i) =>
    createPromise(i + 1, delay + step * i)
      .then(Notiflix.Notify.success)
      .catch(Notiflix.Notify.failure)
  );
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve()) {
        return resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        return reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
