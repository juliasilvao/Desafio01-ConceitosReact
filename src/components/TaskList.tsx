import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]); // As tasks ficam armazenadas aqui
  const [newTaskTitle, setNewTaskTitle] = useState(''); // Utiliza sempre q uma nova task é criada

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return //quando o campo estiver vazio ele não cria a newTask

    // Crio a nova tafera com as informações passadas
    const newTask = {
      id: Math.random(), // Cria um id com numero aleatório utilizando o Math.random()
      title: newTaskTitle, // Pega a informação digitada e armazenada no useState newTaskTitle
      isComplete: false // Inicia sempre como falso
    }

    setTasks(oldState => [...oldState, newTask]) // Faz uma callback. 
    // Utilizando um array ele usa o spread operator(...) para pegar as informações anteriores e adc a newTask
    setNewTaskTitle('') // Retorna ele como null para o input ficar vazio para o usuário
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // Pega a task de acordo com o ID passado
    const newTasks = tasks.map(task => task.id === id ? {
      // Pega toda a informação da task de acordo com o ID
      ...task, 
      // Transforma o isComplete em um valor diferente do que estava no valor acima, ou seja, muda para true ou false
      isComplete: !task.isComplete
    } : task) // Se não for marcado o check retorna o valor como já estava

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // Filtrando para retornar todos os outros itens ignorando o id passado, que precisa ser excluir
    const filteredTasks = tasks.filter(task => task.id !== id)

    // Salva o novo array, SEM o item que excluimos.
    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}