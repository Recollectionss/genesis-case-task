import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TokenSubscribeDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  token: string;
}
