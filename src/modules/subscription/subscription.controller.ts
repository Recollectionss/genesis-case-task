import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscribeDto } from '../../shared/dto/subscribe.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { TokenSubscribeDto } from './dto/token-subscribe.dto';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  // Need use AnyFilesInterceptor for accept only multipart/form-data
  @UseInterceptors(AnyFilesInterceptor())
  @HttpCode(HttpStatus.OK)
  @Post('subscribe')
  async subscribe(@Body() data: SubscribeDto): Promise<void> {
    return this.subscriptionService.subscribe(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get('confirm/:token')
  async confirm(@Param() data: TokenSubscribeDto): Promise<void> {
    return this.subscriptionService.confirm(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get('unsubscribe/:token')
  async unsubscribe(@Param() data: TokenSubscribeDto): Promise<void> {
    return this.subscriptionService.unsubscribe(data);
  }
}
