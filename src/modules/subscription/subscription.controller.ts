import { Controller, Get, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  async subscribe(): Promise<void> {
    return this.subscriptionService.subscribe();
  }

  @Get('confirm/:token')
  async confirm(): Promise<void> {
    return this.subscriptionService.confirm();
  }

  @Get('unsubscribe/:token')
  async unsubscribe(): Promise<void> {
    return this.subscriptionService.unsubscribe();
  }
}
