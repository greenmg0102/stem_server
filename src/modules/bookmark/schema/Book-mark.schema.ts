import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'searchbookmarks' })
export class BookMark {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: Object, required: false })
  details: Record<string, any>;
}

export const BookMarkSchema = SchemaFactory.createForClass(BookMark);
