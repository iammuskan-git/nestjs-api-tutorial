import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {

    @UseGuards(AuthGuard('jwt'))  // Guards le Strategy lai check garxa token xa kinai ani valid token xa kinai vanera
    @Get('me')
    getMe(@Req() req: Request){
        console.log({
            user: req.user
        })
        return 'User Info';
    }
}
