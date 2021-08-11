import { Repository, EntityRepository } from 'typeorm';
import { MuscleGroup } from './muscleGroup.entity';
import { MuscleGroupDTO } from './dto/muscleGroup.dto';

@EntityRepository(MuscleGroup)
export class MuscleGroupRepository extends Repository<MuscleGroup> {

  public async saveMuscleGroup(
    muscleGroupDto: MuscleGroupDTO,
  ): Promise<MuscleGroup> {
    const { id, name } = muscleGroupDto;

    const MuscleGroup_ = new MuscleGroup();
    MuscleGroup_.id = id ? id : null;
    MuscleGroup_.name = name;
    await MuscleGroup_.save();

    return MuscleGroup_;
  }

  public async truncate() {
    await this.query('SET FOREIGN_KEY_CHECKS = 0;');
    await this.query('TRUNCATE TABLE muscle_groups');
    await this.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  public async getAll() {
    return (await this.find());
  }

  public async insertMany(values) {
    await this.createQueryBuilder('muscle_groups')
      .insert()
      .values(values)
      .execute();
  }

}