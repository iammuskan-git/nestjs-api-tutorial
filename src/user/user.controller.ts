import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {

    @UseGuards(JwtGuard)  // Guards le Strategy lai check garxa token xa kinai ani valid token xa kinai vanera
    @Get('me')
    getMe(@Req() req: Request){
        return req.user;
    }
}
