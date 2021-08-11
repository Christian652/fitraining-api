import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingSheet } from './trainingSheet.entity';
import { TrainingSheetDTO } from './dto/trainingSheet.dto';
import { TrainingSheetRepository } from './trainingSheet.repository';

@Injectable()
export class TrainingSheetService {
  private readonly logger = new Logger(TrainingSheetService.name);
  
  constructor(
    @InjectRepository(TrainingSheetRepository)
    private TrainingSheetRepository: TrainingSheetRepository,
  ) { }

  public async save(
    TrainingSheetDTO: TrainingSheetDTO,
  ): Promise<TrainingSheet> {
    try {
      // this.logger.log(` Saving ${TrainingSheetDTO.student.name} TrainingSheet`);
      return await this.TrainingSheetRepository.saveTrainingSheet(TrainingSheetDTO);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(): Promise<TrainingSheet[]> {
    return await this.TrainingSheetRepository.getAll();
  }

  public async getOne(id: number): Promise<TrainingSheet> {

    const foundTrainingSheet = await this.TrainingSheetRepository.findOne(id);
    if (!foundTrainingSheet) {
      this.logger.warn(` Can't Found TrainingSheet With Id : ${id} `);
      throw new NotFoundException(`Não Existe Ficha Com o Id: ${id}`);
    }
    return foundTrainingSheet;
  }

  public async delete(TrainingSheetId: number): Promise<void> {
    try {
      this.logger.log(` Deleting TrainingSheet : ${TrainingSheetId} `);
      await this.TrainingSheetRepository.delete(TrainingSheetId);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}