import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDTO } from './dto/student.dto';
import { Student } from './student.entity';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard';
import { GetStudentFilterDTO } from './dto/getStudent.filter.dto';
import { IsUserLoggedEqualsGuard } from 'src/user/guards/isUserLoggedEquals.guard';
import { UpdateStudentDTO } from './dto/update-student.dto';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('students')
export class StudentController {
  constructor(
    private studentService: StudentService
  ) { }

  @Post()
  @Roles(Role.Admin)
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async create(
    @Body() studentDTO: StudentDTO,
  ): Promise<Student> {
    try {
      const student = await this.studentService.save(studentDTO);
      return student;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @Roles(Role.Admin, Role.Student)
  @UsePipes(
    new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})
  )
  public async update(
    @Body() studentDTO: UpdateStudentDTO,
  ): Promise<Student> {
    try {
      const student = await this.studentService.save(studentDTO);
      return student;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  public async getAll(@Query() parameters: GetStudentFilterDTO): Promise<Student[]> {
    try {
      const student = await this.studentService.getAll(parameters);
      return student;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(RolesGuard, IsUserLoggedEqualsGuard)
  @Roles(Role.Admin, Role.Student)
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<Student> {
    const student = await this.studentService.getOne(id);
    return student;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedStudent = await this.studentService.delete(id);
      return deletedStudent
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}