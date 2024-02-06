import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client"

@Controller('tasks')
export class TaskController{
  constructor(private readonly taskService: TaskService){}

  @Get()
  async getAllTasks(){
    return await this.taskService.getAllTasks()
  }

  @Get(':id')
  async getTask(@Param('id') id: string){
    const taskFound = await this.taskService.getTaskById(+id)
    if(!taskFound){
      throw new NotFoundException("Task was not found.")
    }
  }
  
  @Post()
  async createTask(@Body() data: Task){
    try {
      return await this.taskService.createTask(data)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @Put(':id')
  async updateTask(@Body() data: Task, @Param('id') id: string ){
    try {
      return await this.taskService.updateTask(+id, data)
    } catch (error) {
      throw new NotFoundException("Task was not found.")
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string){
    try {
      return await this.taskService.deleteTask(+id)
    } catch (error) {
      throw new NotFoundException("Task was not found.")
    }
  }
}