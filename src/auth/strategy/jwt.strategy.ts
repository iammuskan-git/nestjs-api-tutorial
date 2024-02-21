import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()   // yo strategy le ni inject gareko xa ni ta config JWT_SECRET ko lagi 
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    
    constructor(
        config: ConfigService, 
        private prisma: PrismaService,  // PrismaService lai inject gareko database bata data tanna ko lagi
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        })
    }
// Token bata data fetch garna milxa tei token ko
   async validate(payload: { sub: number, email: string }) {

        // users/me le tyo token ma vako id access gariraxa Token ko data jhikxa

        const payloadData = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })

        delete payloadData.hash;  // hash lai delete gareko  POSTMAN nadekhyeus vanera
        return payloadData;  // yaha j pathauxau tei janxa tyo 
        // userController usres/me find garda payload vaye id ra email janxa
        // payload leh token banako data haru pathauxa userCOntroller req.user ma 
    }



}