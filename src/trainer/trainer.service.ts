import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from './trainer.entity';
import { TrainerDTO } from './dto/trainer.dto';
import { TrainerRepository } from './trainer.repository';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TrainerService {
  private readonly logger = new Logger(TrainerService.name);

  constructor(
    @InjectRepository(TrainerRepository)
    private TrainerRepository: TrainerRepository,
    readonly userService: UserService
  ) { }

  public async save(
    TrainerDTO: TrainerDTO,
  ): Promise<Trainer> {
    try {
      this.logger.log(` Saving ${TrainerDTO.name} Trainer`);
      const { user } = TrainerDTO;
 
      const user_ = await this.userService.save(user);
      TrainerDTO.user = user_;

      return await this.TrainerRepository.saveTrainer(TrainerDTO);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(): Promise<Trainer[]> {
    return await this.TrainerRepository.getAll();
  }

  public async getOne(id: number): Promise<Trainer> {

    const foundTrainer = await this.TrainerRepository.findOne(id);
    if (!foundTrainer) {
      this.logger.warn(` Can't Found Trainer With Id : ${id} `);
      throw new NotFoundException(`Não Existe Produto Com o Id: ${id}`);
    }
    return foundTrainer;
  }

  public async delete(TrainerId: number): Promise<void> {
    try {
      this.logger.log(` Deleting Trainer : ${TrainerId} `);
      await this.TrainerRepository.delete_(TrainerId);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}