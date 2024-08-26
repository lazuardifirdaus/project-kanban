import { useState, type Dispatch, type SetStateAction } from 'react'
import TaskModal from './TaskModal'
import { TASK_MODAL_TYPE } from '@/constants'
import type { Task } from '@/types'

interface TaskMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  cardId: number
}

const TaskMenu = ({ setIsMenuOpen, cardId }: TaskMenuProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className="absolute flex flex-col bg-white right-4 top-4 py-2 px-4 border border-gray-500 gap-y-2">
      <div className="flex items-center cursor-pointer gap-x-1">
        <span
          className="material-icons"
          onClick={(): void => {
            setIsModalOpen(true)
          }}
        >
          edit
        </span>
        Edit
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="Edit your task"
          type={TASK_MODAL_TYPE.EDIT}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={cardId}
        />
      )}
      <div className="flex items-center cursor-pointer gap-x-1">
        <span className="material-icons">delete</span>Delete
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
