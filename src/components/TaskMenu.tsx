import { useState, type Dispatch, type SetStateAction } from 'react'
import TaskModal from './TaskModal'
import { TASK_MODAL_TYPE } from '@/constants'
import type { Task } from '@/types'
import { useTasksAction } from '@/hooks/useTasksAction'

interface TaskMenuProps {
  task?: Task
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  menuTaskId: number
}

const TaskMenu = ({ setIsMenuOpen, menuTaskId, task }: TaskMenuProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { deleteTask } = useTasksAction()

  return (
    <div className="absolute z-50 flex flex-col bg-white right-4 top-4 py-2 px-4 border border-gray-500 gap-y-2">
      <div
        className="flex items-center cursor-pointer gap-x-1"
        onClick={(): void => {
          setIsModalOpen(true)
        }}
      >
        <span className="material-icons">edit</span>
        Edit
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="Edit your task"
          type={TASK_MODAL_TYPE.EDIT}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={task?.progressOrder as number}
          task={task}
        />
      )}
      <div
        className="flex items-center cursor-pointer gap-x-1"
        onClick={(): void => {
          deleteTask(menuTaskId)
        }}
      >
        <span className="material-icons">delete</span>
        Delete
      </div>
      <span
        className="material-icons absolute top-1 right-1 cursor-pointer"
        onClick={(): void => {
          setIsMenuOpen(false)
        }}
      >
        close
      </span>
    </div>
  )
}

export default TaskMenu
