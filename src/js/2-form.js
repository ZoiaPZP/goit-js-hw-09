import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

form.addEventListener('input', throttle(inputHandle, 700));
form.addEventListener('submit', submitHandle);

let dataInfo = {};

reloadAll();

function inputHandle(evt) {
  
  dataInfo[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(dataInfo));
};

function reloadAll() {
  try {
    const saveData = localStorage.getItem(localStorageKey);
    if (!saveData) return;
    dataInfo = JSON.parse(saveData);
    Object.entries(dataInfo).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch ({message}) {
    console.log(message);
  }
};

function submitHandle(evt) {
  evt.preventDefault();

  
  if (!dataInfo.email || !dataInfo.message) {
    alert('Please fill out all fields');
    return;
  }

  console.log(dataInfo); 
  localStorage.removeItem(localStorageKey); 
  evt.currentTarget.reset(); 
  dataInfo = {}; 
}
