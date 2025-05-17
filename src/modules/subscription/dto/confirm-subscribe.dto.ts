import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ConfirmSubscribeDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  token: string;
}
