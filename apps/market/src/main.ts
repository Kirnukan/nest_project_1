import { NestFactory } from '@nestjs/core';
import { MarketModule } from './market.module';

async function bootstrap() {
  const app = await NestFactory.create(MarketModule);
  await app.listen(3000);
}
bootstrap();
