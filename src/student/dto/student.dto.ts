import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/user.entity';

export class StudentDTO {
    @IsOptional()    
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Type(() => User)
    user: User;

}