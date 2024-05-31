import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type CareerPathCategorySchemaDocument = HydratedDocument<CareerPathCategory>;

@Schema({ timestamps: true, collection: 'careerpathcategorys' })

export class CareerPathCategory {

  @Prop({ required: true })
  careerpathcategory: string;

  @Prop({ required: true })
  status: number;

}

export const CareerPathCategorySchema = SchemaFactory.createForClass(CareerPathCategory);