import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DealsService } from './deals.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @UseGuards(AuthGuard)
  @Get("/")
  getDealsData(@Request() req) {
   
    return this.dealsService.getDeals();
  }
}
