import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './exercise.entity';
import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseRepository } from './exercise.repository';

@Injectable()
export class ExerciseService {
  private readonly logger = new Logger(ExerciseService.name);
  
  constructor(
    @InjectRepository(ExerciseRepository)
    private ExerciseRepository: ExerciseRepository,
  ) { }

  public async save(
    ExerciseDTO: ExerciseDTO,
  ): Promise<Exercise> {
    try {
      this.logger.log(` Saving ${ExerciseDTO.name} Exercise`);
      return await this.ExerciseRepository.saveExercise(ExerciseDTO);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(): Promise<Exercise[]> {
    return await this.ExerciseRepository.getAll();
  }

  public async getOne(id: number): Promise<Exercise> {

    const foundExercise = await this.ExerciseRepository.findOne(id);
    if (!foundExercise) {
      this.logger.warn(` Can't Found Exercise With Id : ${id} `);
      throw new NotFoundException(`Não Existe Exercicio Com o Id: ${id}`);
    }
    return foundExercise;
  }

  public async delete(ExerciseId: number): Promise<void> {
    try {
      this.logger.log(` Deleting Exercise : ${ExerciseId} `);
      await this.ExerciseRepository.delete(ExerciseId);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}