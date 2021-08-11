import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exercise } from 'src/exercise/exercise.entity';

export class MuscleGroupDTO {

    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

}