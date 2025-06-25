// Módulo de tareas usando ES6+
// Provee funciones para obtener, agregar, eliminar y actualizar tareas usando localStorage

const STORAGE_KEY = 'tasks'; // Clave para localStorage

// Devuelve la lista de tareas almacenadas
export function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Agrega una tarea nueva (como objeto) y la guarda en localStorage
export function addTask(texto) {
  const tasks = getTasks();
  tasks.push({
    texto,
    completada: false
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Elimina una tarea por índice y actualiza localStorage
export function removeTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Actualiza el texto y/o estado de una tarea por índice
export function updateTask(index, newText, completada = null) {
  const tasks = getTasks();
  if (newText !== null) {
    tasks[index].texto = newText;
  }
  if (completada !== null) {
    tasks[index].completada = completada;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
