import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//connect to the database (business logic)
//super leh PrismaClient ko constructor lai call garxa
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(){
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            },
        });
    }



}
