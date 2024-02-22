import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)  // Guards le Strategy lai check garxa token xa kinai ani valid token xa kinai vanera // JwtGuard custom Guard ho 
@Controller('users')
export class UserController {

    @Get('me')
    getMe(@GetUser() users: User ){   // @GetUser custom decorator ho
        return users;
    }

  
}


// Get ma usually 200 StatusCode fyakxa
// Post le 201 StatusCode fyakxa
