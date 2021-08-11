import { Type } from 'class-transformer';
import { IsJSON, IsNotEmpty } from 'class-validator';
import { MuscleGroup } from 'src/muscleGroup/muscleGroup.entity';
import { TrainingSheet } from 'src/trainingSheet/trainingSheet.entity';

export class TrainingDTO {

    id: number;

    @IsNotEmpty()
    @IsJSON()
    days_in_week: JSON;

    @IsNotEmpty()
    @Type(() => TrainingSheet)
    training_sheet: TrainingSheet;

    @IsNotEmpty()
    @Type(() => MuscleGroup)
    muscle_groups: MuscleGroup[];

}