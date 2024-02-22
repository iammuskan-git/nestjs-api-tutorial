import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // built-in validation pipe from Nestjs
import { withLatestFrom } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true  // AuthDto ma navako field haru dekhaudaina
    }
  ));
  await app.listen(3334);
}
bootstrap();

// run by yarn start:dev
