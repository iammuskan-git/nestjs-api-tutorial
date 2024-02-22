import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


describe('App e2e', () => {

let app: INestApplication;  //1 
let prisma: PrismaService

beforeAll(async() => {                  ////////////////////////////
    const moduleRef = await Test.createTestingModule({ //2
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication(); //3
    app.useGlobalPipes(                  //4
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();           //5

    prisma = app.get(PrismaService);
    await prisma.cleanDb()
});



  afterAll(() => {                    /////////////////////////////
    app.close();  //6
  });



  it.todo("should pass");
});