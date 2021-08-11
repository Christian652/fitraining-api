import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Exercise } from 'src/exercise/exercise.entity';
import { Training } from 'src/training/training.entity';

export class TrainingItemDTO {

    id: number;

    @IsInt()
    @IsNotEmpty()
    num_reps: number;

    @IsInt()
    @IsNotEmpty()
    num_sets: number;

    @IsNotEmpty()
    @Type(() => Exercise)
    exercise: Exercise;

    @IsNotEmpty()
    @Type(() => Training)
    training: Training;

}