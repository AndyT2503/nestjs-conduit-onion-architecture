import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto, UserDto, UserService
} from 'src/application/user';
import { AuthGuard } from 'src/infrastructure/auth';
import { ExceptionDto } from 'src/infrastructure/exceptions';

@ApiResponse({
  status: 422,
  description: 'Unexpected Error',
  type: ExceptionDto,
})
@ApiTags('user')
@Controller({
  path: 'user',
})
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({
    type: UserDto,
  })
  @Post()
  async registerUser(@Body() user: RegisterUserDto): Promise<UserDto> {
    return await this.userService.registerUser(user);
  }

  @ApiOkResponse({
    type: LoginUserDto,
  })
  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<UserDto> {
    return await this.userService.login(user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserDto,
  })
  @UseGuards(AuthGuard)
  @Get()
  async getCurrentUserProfile(): Promise<UserDto> {
    return await this.userService.getCurrentUserProfile();
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserDto,
  })
  @UseGuards(AuthGuard)
  @Put()
  async updateCurrentUserProfile(
    @Body() request: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.userService.updateUser(request);
  }
}
