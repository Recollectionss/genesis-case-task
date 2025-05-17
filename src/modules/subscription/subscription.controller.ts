import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscribeDto } from '../dto/subscribe.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ConfirmSubscribeDto } from './dto/confirm-subscribe.dto';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  // Need use AnyFilesInterceptor for accept only multipart/form-data
  @UseInterceptors(AnyFilesInterceptor())
  @Post('subscribe')
  async subscribe(@Body() data: SubscribeDto): Promise<void> {
    return this.subscriptionService.subscribe(data);
  }

  @Get('confirm/:token')
  async confirm(@Param() data: ConfirmSubscribeDto): Promise<void> {
    return this.subscriptionService.confirm(data);
  }

  @Get('unsubscribe/:token')
  async unsubscribe(): Promise<void> {
    return this.subscriptionService.unsubscribe();
  }
}
