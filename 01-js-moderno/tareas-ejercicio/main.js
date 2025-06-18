// Importa las funciones del módulo de tareas
import { getTasks, addTask, removeTask, updateTask } from './tareas.js';

// Referencias a los elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Renderiza la lista de tareas con filtro (all, completadas, pendientes)
function renderTasks(filter = 'all') {
  list.innerHTML = '';
  getTasks().forEach(({ texto, completada }, idx) => {
    if (
      (filter === 'completadas' && !completada) ||
      (filter === 'pendientes' && completada)
    ) {
      return;
    }

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completada;
    checkbox.onchange = () => {
      updateTask(idx, null, checkbox.checked);
      renderTasks(filter);
    };

    const span = document.createElement('span');
    span.textContent = texto;
    if (completada) {
      span.style.textDecoration = 'line-through';
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => {
      removeTask(idx);
      renderTasks(filter);
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => {
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = texto;

      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Guardar';

      li.innerHTML = '';
      li.appendChild(inputEdit);
      li.appendChild(saveBtn);

      saveBtn.onclick = () => {
        if (inputEdit.value.trim() !== '') {
          updateTask(idx, inputEdit.value.trim());
          renderTasks(filter);
        }
      };
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Evento submit para agregar tarea nueva con validación
form.onsubmit = e => {
  e.preventDefault();
  const newTask = input.value.trim();

  if (newTask === '') {
    alert('Por favor ingresa una tarea');
    return;
  }

  addTask(newTask);
  input.value = '';
  renderTasks();
};

// Render inicial
renderTasks();
