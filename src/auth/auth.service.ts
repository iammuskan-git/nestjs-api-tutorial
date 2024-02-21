import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';



// dependency injection
@Injectable()
export class AuthService{
   constructor(private prisma: PrismaService) {}
   async signup(dto: AuthDto) {
                const hash = await argon.hash(dto.password);
                try{
                    const newUser = await this.prisma.user.create({
                        data: {
                            email: dto.email,
                             hash,
                        },
                    });
                    return newUser;
                    }catch(error){
                    if(error.code === 'P2002'){
                        throw new ForbiddenException('Email already exists');
                    }
                        throw error;
                }
    }


   async signin(dto: AuthDto) {
     const findUser = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            },
        });

        if(!findUser){
            throw new ForbiddenException('Invalid Email not found credentials');
        }

        const matchedPassword = await argon.verify(
            findUser.hash,
            dto.password,
            );

        if(!matchedPassword){
            throw new ForbiddenException('Invalid Password');
        }

        return findUser;
    }
}