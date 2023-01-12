import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:4200'], credentials: true });
  const port = process.env.PORT || 3000;
  app.use(cookieParser());
  await app.listen(port, () =>
    console.log(`Server has successfully started on port ${port}`),
  );
}
bootstrap();
