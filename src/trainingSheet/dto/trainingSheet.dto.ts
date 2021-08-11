import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Student } from '../../student/student.entity';
import { Trainer } from '../../trainer/trainer.entity';

export class TrainingSheetDTO {

    id: number;

    @IsDate()
    @IsNotEmpty()
    start_date: Date;

    @IsDate()
    @IsNotEmpty()
    end_date: Date;

    @Type(() => Trainer)
    @IsNotEmpty()
    trainer: Trainer;

    @Type(() => Student)
    @IsNotEmpty()
    student: Student;
}