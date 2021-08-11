import { Repository, EntityRepository } from 'typeorm';
import { TrainingSheet } from './trainingSheet.entity';
import { TrainingSheetDTO } from './dto/trainingSheet.dto';

@EntityRepository(TrainingSheet)
export class TrainingSheetRepository extends Repository<TrainingSheet> {

  public async saveTrainingSheet(
    trainingSheetDto: TrainingSheetDTO,
  ): Promise<TrainingSheet> {
    const { id, end_date, start_date, trainer, student } = trainingSheetDto;

    const TrainingSheet_ = new TrainingSheet();
    TrainingSheet_.id = id ? id : null;
    TrainingSheet_.end_date = end_date;
    TrainingSheet_.start_date = start_date;
    TrainingSheet_.trainer = trainer;
    TrainingSheet_.student = student;    

    await TrainingSheet_.save();

    return TrainingSheet_;
  }

  public async getAll() {
    return (await this.find({ relations: ['trainings', 'student', 'trainer'] }));
  }

}