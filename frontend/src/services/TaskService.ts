import api from "./api"

const TaskService = {
  
  async findAll() {
    const response = await api.get('tasks')
    return response.data
  }
}

export default TaskService