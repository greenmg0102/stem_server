import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type OpportunitySchemaDocument = HydratedDocument<Opportunity>;

@Schema({ timestamps: true, collection: 'opportunitys' })

export class Opportunity {

  @Prop({ required: true })
  opportunity: string;
  
  @Prop({ required: true })
  status: number;

}

export const OpportunitySchema = SchemaFactory.createForClass(Opportunity);