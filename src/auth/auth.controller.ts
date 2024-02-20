import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// class or AuthController is annotated with decorator Controller()
// Controller is handling incoming request and sending response back to the browser
@Controller("auth")
export class AuthController {
    // yei nai dependency injection ho tyo AuthService class lai inject gareko xa fheri new object vanera tannu pardaina SINGLETON vayo load dherai hudaina
    // return le jun dataype ko return garxa tei datatype automatically gayera basxa POSTMAN ko headers content-type my text/html or appliaction/json vanera
    constructor(private authService: AuthService) {}

    //POST /auth/signup
    @Post("signup")
    signup(){
        return { message: "Signup Function"}
    }

    //POST /auth/signin
    @Post("signin")
    signin(){
        return "Signin Function"
    }
}