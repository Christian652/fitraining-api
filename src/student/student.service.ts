import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentDTO } from './dto/student.dto';
import { StudentRepository } from './student.repository';
import { GetStudentFilterDTO } from './dto/getStudent.filter.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);

  constructor(
    @InjectRepository(StudentRepository)
    private StudentRepository: StudentRepository,
    readonly userService: UserService
  ) { }

  public async save(
    StudentDTO: StudentDTO,
  ): Promise<Student> {
    try {
      this.logger.log(` Saving ${StudentDTO.name} Student`);
      const { user } = StudentDTO;

      const user_ = await this.userService.save(user);
      StudentDTO.user = user_;

      return await this.StudentRepository.saveStudent(StudentDTO);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(parameters: GetStudentFilterDTO): Promise<Student[]> {
    return await this.StudentRepository.getAll(parameters);
  }

  public async getOne(id: number): Promise<Student> {

    const foundStudent = await this.StudentRepository.findOne(id, { relations: ['training_sheets'] });
    if (!foundStudent) {
      this.logger.warn(` Can't Found Student With Id : ${id} `);
      throw new NotFoundException(`Não Existe Produto Com o Id: ${id}`);
    }
    return foundStudent;
  }

  public async delete(StudentId: number): Promise<void> {
    try {
      this.logger.log(` Deleting Student : ${StudentId} `);
      await this.StudentRepository.delete_(StudentId);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}