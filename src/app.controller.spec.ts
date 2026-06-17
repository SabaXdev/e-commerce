import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hi saba, U have to CONQUER THE WORLD! Right here, right now"', () => {
      expect(appController.getTask()).toBe('Hi saba, U have to CONQUER THE WORLD! Right here, right now');
    });
  });
});
