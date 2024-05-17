import { Module } from '@nestjs/common';
import { OpportunitySearchService } from './service/Opportunity-Search.service';
import { OpportunitySearchController } from './controller/Opportunity-Search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Opportunity, OpportunitySchema } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';
import { Stem, StemSchema } from 'src/modules/admin/stem/schemas/stem.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Opportunity.name, schema: OpportunitySchema },
    { name: Stem.name, schema: StemSchema },
  ])],
  providers: [OpportunitySearchService],
  controllers: [
    OpportunitySearchController
  ]
})

export class OpportunitySearchModule { }