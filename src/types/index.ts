export interface Task {
  // findIndex(arg0: (task: any) => boolean): unknown
  id: number
  title: string
  detail: string
  dueDate: string
  progressOrder: number
}
