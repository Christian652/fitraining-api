import { Repository, EntityRepository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { ExerciseDTO } from './dto/exercise.dto';

@EntityRepository(Exercise)
export class ExerciseRepository extends Repository<Exercise> {

  public async saveExercise(
    exerciseDto: ExerciseDTO,
  ): Promise<Exercise> {
    const { id, name } = exerciseDto;

    const Exercise_ = this.create();
    Exercise_.id = id ? id : null;
    Exercise_.name = name;

    await Exercise_.save();

    return Exercise_;
  }

  public async insertMany(values) {
    await this.createQueryBuilder('exercises')
      .insert()
      .values(values)
      .execute();
  }

  public async truncate() {
    await this.query('SET FOREIGN_KEY_CHECKS = 0;');
    await this.query('TRUNCATE TABLE exercises');
    await this.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  public async getAll() {
    return (await this.find({relations: ['muscle_groups']}));
  }
}