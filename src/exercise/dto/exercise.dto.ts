import { IsNotEmpty, IsString } from 'class-validator';

export class ExerciseDTO {

    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

}