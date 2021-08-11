import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSheetService } from './trainingSheet.service';
import { TrainingSheetRepository } from './trainingSheet.repository';
import { NotFoundException } from '@nestjs/common';

describe('TrainingSheetService', () => {
  let trainingSheetService;
  let trainingSheetRepository;

  const mockTrainingSheetRepository = () => ({
    saveTrainingSheet: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingSheetService,
        {
          provide: TrainingSheetRepository,
          useFactory: mockTrainingSheetRepository,
        },
      ],
    }).compile();
    trainingSheetService = await module.get<TrainingSheetService>(TrainingSheetService);
    trainingSheetRepository = await module.get<TrainingSheetRepository>(TrainingSheetRepository);
  });

  describe('createTrainingSheet', () => {
    it('should save a trainingSheet in the database', async () => {
      trainingSheetRepository.saveTrainingSheet.mockResolvedValue('someTrainingSheet');
      expect(trainingSheetRepository.saveTrainingSheet).not.toHaveBeenCalled();
      
      const createTrainingSheetDto = {
        name: "Blusa de Manga Longa",
        description: "uma peça de roupa bem casual",
        unitPrice: 15.75
      }	;
      
      const result = await trainingSheetService.save(createTrainingSheetDto);
     
      expect(trainingSheetRepository.saveTrainingSheet).toHaveBeenCalledWith(createTrainingSheetDto);
      expect(result).toEqual('someTrainingSheet');
    });
  });

  describe('getTrainingSheets', () => {
    it('should get all trainingSheets', async () => {
      trainingSheetRepository.find.mockResolvedValue('someTrainingSheets');
      expect(trainingSheetRepository.find).not.toHaveBeenCalled();
      const result = await trainingSheetService.getAll();
      expect(trainingSheetRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someTrainingSheets');
    });
  });

  describe('getTrainingSheet', () => {
    it('should retrieve a trainingSheet with an ID', async () => {
      const mockTrainingSheet = {
        id: 1,
        name: "Blusa de Manga Longa",
        description: "uma peça de roupa bem casual",
        unitPrice: 15.75
      };

      trainingSheetRepository.findOne.mockResolvedValue(mockTrainingSheet);
      
      const result = await trainingSheetService.getOne(1);
      
      expect(result).toEqual(mockTrainingSheet);
      expect(trainingSheetRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('throws an error as a trainingSheet is not found', () => {
      trainingSheetRepository.findOne.mockResolvedValue(null);
      expect(trainingSheetService.getOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteTrainingSheet', () => {
    it('should delete trainingSheet', async () => {
      trainingSheetRepository.delete.mockResolvedValue(1);
      expect(trainingSheetRepository.delete).not.toHaveBeenCalled();
      await trainingSheetService.delete(1);
      expect(trainingSheetRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});