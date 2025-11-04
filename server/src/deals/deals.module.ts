import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { Deals } from './entities/deals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deals])],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
