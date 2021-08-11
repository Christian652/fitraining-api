import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Trainer } from './trainer.entity';
import { TrainerDTO } from './dto/trainer.dto';
import { User } from 'src/user/user.entity';

@EntityRepository(Trainer)
export class TrainerRepository extends Repository<Trainer> {

  public async saveTrainer(
    trainerDto: TrainerDTO,
  ): Promise<Trainer> {
    const { id, name, user } = trainerDto;

    const Trainer_ = new Trainer();
    Trainer_.id = id ? id : null;
    Trainer_.name = name;
    Trainer_.user = user;

    await Trainer_.save();

    return Trainer_;
  }

  public async getAll() {
    return (await this.find({ relations: ['training_sheets'] }));
  }

  public async delete_(trainerId) {
    const trainer_ = await this.findOne({
      where: {
        id: trainerId
      },
      relations: ['user']
    });

    getRepository(User).delete(trainer_.user.id);
    this.delete(trainer_.id);

  }

}