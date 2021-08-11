import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Student } from './student.entity';
import { StudentDTO } from './dto/student.dto';
import { GetStudentFilterDTO } from './dto/getStudent.filter.dto';
import { User } from 'src/user/user.entity';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {

  public async saveStudent(
    studentDto: StudentDTO,
  ): Promise<Student> {
    const { id, name, user } = studentDto;

    const student_ = new Student();
    student_.id = id ? id : null;
    student_.name = name;
    student_.user = user;

    await student_.save();

    return student_;
  }

  public async getAll(parameters: GetStudentFilterDTO) {
    const { orderBy, sort, like } = parameters;

    const query = this.createQueryBuilder('students');

    if (like) 
      query.andWhere('students.name LIKE :like', {like: `%${like}%`});

    if (orderBy) 
      if (sort) {
        query.orderBy(orderBy, sort);
      } else {
        query.orderBy(orderBy)
      }

    query.leftJoinAndSelect("students.training_sheets", "training_sheets");

    return await query.getMany();
  }


  public async delete_(studentId) {
    const student_ = await this.findOne({
      where: {
        id: studentId
      },
      relations: ['user']
    });

    getRepository(User).delete(student_.user.id);
    this.delete(student_.id);
  }

}