import { useRecoilState } from 'recoil'
import type { Task } from '@/types'
import { tasksState } from '@/features/taskAtoms'
import { TASK_PROGRESS_ID } from '@/constants'

interface useTaskActionType {
  completeTask: (taskId: number) => void
  moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void
  addTask: (title: string, detail: string, dueDate: string, progressOrder: number) => void
  editTask: (
    taskId: number,
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ) => void
  deleteTask: (taskId: number) => void
}

export const useTasksAction = (): useTaskActionType => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

  const completeTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED } : task,
    )
    setTasks(updatedTasks)
  }

  const moveTaskCard = (taskId: number, directionNumber: 1 | -1): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, progressOrder: task.progressOrder + directionNumber } : task,
    )

    setTasks(updatedTasks)
    // console.log(tasks)
    // console.log(updatedTasks)
  }

  const addTask = (title: string, detail: string, dueDate: string, progressOrder: number): void => {
    const newTask: Task = {
      id: (tasks[tasks.length - 1]?.id || 0) + 1,
      title,
      detail,
      dueDate,
      progressOrder,
    }
    setTasks([...tasks, newTask])
  }

  const editTask = (
    taskId: number,
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, title, detail, dueDate, progressOrder } : task,
    )
    setTasks(updatedTasks)
  }

  const deleteTask = (taskId: number): void => {
    // console.log('Deleting task with ID:', taskId)
    // console.log('Tasks before deletion:', tasks)
    const removedTask = tasks.filter((task) => task.id !== taskId) // menghilangkan task dengan cara filter
    // console.log('Tasks after deletion:', removedTask)
    setTasks(removedTask)
  }

  // const filterTask = (progressOrder: number): Task[] => {
  //   return tasks.filter((task) => task.progressOrder === progressOrder)
  // }

  return {
    completeTask,
    moveTaskCard,
    addTask,
    editTask,
    deleteTask,
  }
}
