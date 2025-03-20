const canvas = document.getElementById('canvas');
const form = document.getElementById('propertyForm');
let selectedElement = null;

// Drag and Drop Events
document.querySelectorAll('.draggable').forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

canvas.addEventListener('dragover', dragOver);
canvas.addEventListener('drop', drop);

// Drag Start
function dragStart(e) {
  e.dataTransfer.setData('type', e.target.dataset.type);
}

// Allow Drop
function dragOver(e) {
  e.preventDefault();
}

// Handle Drop
function drop(e) {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  const element = createElement(type);
  element.addEventListener('click', () => openEditor(element));
  canvas.appendChild(element);
}

// Create New Element
function createElement(type) {
  const el = document.createElement('div');
  el.classList.add('element');
  switch(type) {
    case 'text':
      el.textContent = 'Editable Text';
      break;
    case 'image':
      const img = document.createElement('img');
      img.src = 'https://via.placeholder.com/150';
      img.alt = 'Image';
      img.style.width = '150px';
      img.style.height = '150px';
      el.appendChild(img);
      break;
    case 'button':
      const btn = document.createElement('button');
      btn.textContent = 'Click Me';
      el.appendChild(btn);
      break;
  }
  return el;
}

// Open Form Editor
function openEditor(element) {
  selectedElement = element;
  const contentInput = form.querySelector('#content');
  const colorInput = form.querySelector('#color');

  if (element.childNodes.length === 1 && element.firstChild.nodeType === Node.TEXT_NODE) {
    contentInput.value = element.textContent;
  } else {
    contentInput.value = '';
  }
  colorInput.value = '#000000';
}

// Update Properties
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!selectedElement) return;

  const content = form.content.value;
  const color = form.color.value;

  if (selectedElement.childNodes.length === 1 && selectedElement.firstChild.nodeType === Node.TEXT_NODE) {
    selectedElement.textContent = content;
  }

  selectedElement.style.color = color;
});
