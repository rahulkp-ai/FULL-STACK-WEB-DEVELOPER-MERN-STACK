const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Fetch and display tasks on load
async function fetchTasks() {
  try {
    const res = await fetch('/api/tasks');
    const result = await res.json();
    if (result.success) {
      renderTasks(result.data);
    }
  } catch (err) {
    console.error('Error fetching tasks:', err);
  }
}

// Render tasks to DOM
function renderTasks(tasks) {
  if (tasks.length === 0) {
    taskList.innerHTML = '<li style="text-align: center; color: #888; padding: 20px;">No tasks found. Add one above!</li>';
    return;
  }

  taskList.innerHTML = tasks.map(task => `
    <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task._id}">
      <div class="task-info" onclick="toggleTask('${task._id}', ${!task.completed})">
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="event.stopPropagation(); toggleTask('${task._id}', ${!task.completed})">
        <span>${escapeHTML(task.title)}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
    </li>
  `).join('');
}

// Add new task
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  try {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const result = await res.json();
    if (result.success) {
      taskInput.value = '';
      fetchTasks();
    }
  } catch (err) {
    console.error('Error creating task:', err);
  }
});

// Toggle task completion
async function toggleTask(id, completed) {
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    const result = await res.json();
    if (result.success) {
      fetchTasks();
    }
  } catch (err) {
    console.error('Error updating task:', err);
  }
}

// Delete task
async function deleteTask(id) {
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });
    const result = await res.json();
    if (result.success) {
      fetchTasks();
    }
  } catch (err) {
    console.error('Error deleting task:', err);
  }
}

// Helper to prevent XSS
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Initial load
fetchTasks();