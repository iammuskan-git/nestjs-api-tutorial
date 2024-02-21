import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";



// dependency injection
@Injectable()
export class AuthService{
   constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

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


        try{
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
    
            return this.signToken(findUser.id, findUser.email);  // calling signToken function ani token ani token kasari banyo vanda id, email le
        }catch(error){
            throw new Error('Unable to get token while signin/login');
        }
     
    }




    async signToken(userId: number, email: string) :Promise<{access_token: string}>{

        const payload = {
            sub: userId, // sub vaneko unique hunu parxa hai in nestjs ma,
            email,
        }

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });

        return {
            access_token: token,
        }

    }





}