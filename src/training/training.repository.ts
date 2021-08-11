import { Repository, EntityRepository } from 'typeorm';
import { Training } from './training.entity';
import { TrainingDTO } from './dto/training.dto';
import { GetTrainingFilterDTO } from './dto/getTraining.filter.dto';
import { MuscleGroup } from 'src/muscleGroup/muscleGroup.entity';

@EntityRepository(Training)
export class TrainingRepository extends Repository<Training> {

  public async saveTraining(
    trainingDto: TrainingDTO,
  ): Promise<Training> {
    const { id, days_in_week, muscle_groups, training_sheet } = trainingDto;

    const muscle_groups_ = muscle_groups.map(item => {
      const muscle_group_ = new MuscleGroup();
      muscle_group_.id = item.id;
      muscle_group_.reload();

      if (muscle_group_.id !== null && muscle_group_.id !== undefined) return muscle_group_;
    });

    const Training_ = this.create();
    Training_.id = id ? id : null;
    Training_.days_in_week = days_in_week;
    Training_.muscle_groups = muscle_groups_;
    Training_.training_sheet = training_sheet;

    await Training_.save();

    return Training_;
  }

  public async getAll() {
    return (await this.find({ relations: ['muscle_groups', 'training_items', 'training_sheet'] }));
  }
}