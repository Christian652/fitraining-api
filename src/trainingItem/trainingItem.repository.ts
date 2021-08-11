import { Repository, EntityRepository } from 'typeorm';
import { TrainingItem } from './trainingItem.entity';
import { TrainingItemDTO } from './dto/trainingItem.dto';

@EntityRepository(TrainingItem)
export class TrainingItemRepository extends Repository<TrainingItem> {

  public async saveTrainingItem(
    trainingItemDto: TrainingItemDTO,
  ): Promise<TrainingItem> {
    const { id, num_reps, num_sets, exercise, training } = trainingItemDto;

    const TrainingItem_ = new TrainingItem();
    TrainingItem_.id = id ? id : null;
    TrainingItem_.num_sets = num_sets;
    TrainingItem_.num_reps = num_reps;
    TrainingItem_.exercise = exercise;
    TrainingItem_.training = training;

    await TrainingItem_.save();

    return TrainingItem_;
  }

  public async getAll() {
    return (await this.find({relations: ['training', 'exercise']}))
  }

}