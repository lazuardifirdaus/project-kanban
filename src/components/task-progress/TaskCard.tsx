import React, { useState } from 'react'
import TaskMenu from '../TaskMenu'
import { useTasksAction } from '@/hooks/useTasksAction'
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '@/constants'
import type { Task } from '@/types'
import TaskIcon from '../TaskIcon'
import { tasksState } from '@/features/taskAtoms'

interface TaskCardProps {
  task: Task
  defaultProgressOrder: number
}

const TaskCard = ({ task, defaultProgressOrder }: TaskCardProps): JSX.Element => {
  const { moveTaskCard } = useTasksAction()
  const isStarted = task.progressOrder === TASK_PROGRESS_ID.NOT_STARTED

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <div className="bg-green-200 p-6 rounded-xl my-2 flex flex-col gap-y-2 text-xl relative">
      <div className="flex justify-between">
        <TaskIcon task={task} />
        {/* <div className="material-icons">check_circle</div> */}
        <div
          className="material-icons cursor-pointer"
          onClick={(): void => {
            setIsMenuOpen(true) // Ditambahkan
          }}
        >
          more_vert
        </div>
      </div>
      <p className="text-3xl font-medium mt-2">{task.title}</p>
      <div>
        <p>{task.detail}</p>
      </div>
      <div>
        <p>Due on {task.dueDate}</p>
      </div>
      <div className={`flex ${isStarted ? 'justify-end' : 'justify-between'}`}>
        {task.progressOrder !== TASK_PROGRESS_ID.NOT_STARTED && (
          <button
            className="material-icons"
            onClick={(): void => {
              moveTaskCard(task.id, -1)
            }}
          >
            chevron_left
          </button>
        )}
        {task.progressOrder !== TASK_PROGRESS_ID.COMPLETED && (
          <button
            className="material-icons"
            onClick={(): void => {
              moveTaskCard(task.id, 1)
            }}
          >
            chevron_right
          </button>
        )}
      </div>
      {isMenuOpen && <TaskMenu setIsMenuOpen={setIsMenuOpen} menuTaskId={task.id} task={task} />}
    </div>
  )
}

export default TaskCard
