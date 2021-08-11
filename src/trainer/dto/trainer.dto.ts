import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/user.entity';

export class TrainerDTO {

    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @Type(() => User)
    @IsNotEmpty()
    user: User;

}