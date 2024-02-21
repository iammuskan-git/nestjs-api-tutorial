import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";


// annoted with @Module() decorator
@Module({
    controllers: [AuthController],
    providers: [AuthService],
})


export class AuthModule{}