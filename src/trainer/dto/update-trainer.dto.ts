import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/user.entity';

export class UpdateTrainerDTO {

    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @Type(() => User)
    @IsOptional()
    user: User;

}