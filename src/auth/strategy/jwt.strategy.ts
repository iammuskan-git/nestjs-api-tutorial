import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()   // yo strategy le ni inject gareko xa ni ta config JWT_SECRET ko lagi 
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    validate(payload: any) {
        return payload;  // yaha j pathauxau tei janxa tyo 
        // userController usres/me find garda payload vaye id ra email janxa
        // payload leh token banako data haru pathauxa userCOntroller req.user ma 
    }



}