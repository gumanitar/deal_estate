import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DealsDto } from './dtos/deals.dto';
import { Deals } from './entities/deals.entity';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deals)
    private dealsRepository: Repository<Deals>,
  ) {}

  async getDeals() {
    const dealsList = await this.dealsRepository.find();

    return dealsList;
  }
}
