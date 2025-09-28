// const uuid = crypto.randomUUID();
// console.log(uuid); 

const modalBtn = document.querySelector('.modalWindowBtn')
const modalWindow = document.querySelector('.taskModal')
const taskHead = document.querySelector('.input-head')
const taskBody = document.querySelector('.input-body')
const taskList = document.querySelector('.task-list')
const processList = document.querySelector('.process-list')
const completedList = document.querySelector('.completed-list')
const clearBtn = document.querySelector('.btn-clear')


const date = new Date()

// Появление модального окна
modalBtn.addEventListener('click',()=> {
  modalWindow.classList.toggle('hidden')
})

function hideModal() {
  modalWindow.classList.toggle('hidden')
}

function addTask() {
  event.preventDefault()
  if(taskHead.value === '') {
    alert('Введите заголовок') 
  } else {
    let task = document.createElement('div')
    let nowDate = `${date.getDate()>9? date.getDate() : '0'+date.getDate()}.${date.getMonth()>9?date.getMonth()+1:'0'+(date.getMonth()+1)}.${date.getFullYear()}`
    let nowTime = `${date.getHours()}:${date.getMinutes()}`
    
    // Добавляем атрибут draggable и класс для стилизации
    task.setAttribute('draggable', 'true')
    task.className = 'task-item'
    
    task.innerHTML = `<div class="task-1 bg-white h-[100px] ${taskList.firstElementChild? 'mt-[10px]' : ''} rounded-[8px] p-[5px] overflow-y-auto flex flex-col justify-between cursor-move">
                        <div class="">
                        <p class="text-light text-[18px]">${taskHead.value}</p>
                        <p class="text-light text-[12px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">${taskBody.value} </p></div>
                        <p class="flex row justify-between text-light text-[11px] text-[grey]"><span>${nowTime}</span> <span>${nowDate}</span></p>
                    </div>`
    
    // Добавляем обработчики событий для drag and drop
    addDragListeners(task)
    
    taskList.append(task)
    taskBody.value = ''
    taskHead.value = ''
    hideModal()
  }
}

// Функция для добавления обработчиков drag and drop
function addDragListeners(item) {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', '')
    e.target.classList.add('dragging')
    // Сохраняем родительский элемент для определения исходной колонки
    e.dataTransfer.setData('source-column', e.target.parentElement.className)
  })
  
  item.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging')
  })
}

// Добавляем обработчики для колонок
const columns = [taskList, processList, completedList]

columns.forEach(column => {
  column.addEventListener('dragover', (e) => {
    e.preventDefault()
    // Показываем визуальную подсказку, что можно бросить
    column.classList.add('drag-over')
  })
  
  column.addEventListener('dragleave', () => {
    column.classList.remove('drag-over')
  })
  
  column.addEventListener('drop', (e) => {
    e.preventDefault()
    column.classList.remove('drag-over')
    
    const draggingItem = document.querySelector('.dragging')
    if (draggingItem) {
      // Добавляем отступ сверху, если в колонке уже есть элементы
      if (column.firstElementChild) {
        draggingItem.firstElementChild.classList.add('mt-[10px]')
      } else {
        draggingItem.firstElementChild.classList.remove('mt-[10px]')
      }
      
      column.appendChild(draggingItem)
    }
  })
})

clearBtn.addEventListener('click',()=> {
  while(completedList.firstChild) {
    completedList.removeChild(completedList.firstChild)
  }
})


// Инициализируем существующие элементы (если они есть)
document.querySelectorAll('.task-item').forEach(item => {
  addDragListeners(item)
})