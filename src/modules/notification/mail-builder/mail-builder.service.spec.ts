import { Test, TestingModule } from '@nestjs/testing';
import { MailBuilderService } from './mail-builder.service';

describe('MailBuilderService', () => {
  let service: MailBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailBuilderService],
    }).compile();

    service = module.get<MailBuilderService>(MailBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
