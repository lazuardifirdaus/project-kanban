import { useTasksAction } from '@/hooks/useTasksAction'
import { tasksState } from '@/features/taskAtoms'
import { TASK_PROGRESS_ID } from '@/constants'
import { Task } from '@/types'

interface TaskIconProps {
  task: Task
}

const TaskIcon = ({ task }: TaskIconProps) => {
  const { completeTask } = useTasksAction()
  const isProgressCompleted = task.progressOrder === TASK_PROGRESS_ID.COMPLETED

  return (
    <span
      className={`material-icons mr-4 text-3xl ${isProgressCompleted ? 'text-green-500 cursor-default' : 'text-gray-400 cursor-pointer'}`}
      onClick={(): void => {
        completeTask(task.id) // Ditambahkan
      }}
    >
      check_circle
    </span>
  )
}

export default TaskIcon
