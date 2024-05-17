import { Module } from '@nestjs/common';
import { OpportunityService } from './services/opportunity.service';
import { OpportunityController } from './controllers/Opportunity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/modules/admin/blog/schemas/blog.schema';
import { Opportunity, OpportunitySchema } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Blog.name, schema: BlogSchema },
    { name: Opportunity.name, schema: OpportunitySchema },
  ])],
  providers: [OpportunityService],
  controllers: [
    OpportunityController
  ]
})

export class OpportunityModule { }