import { Module } from '@nestjs/common';
import { CredentialSearchService } from './service/Credential-Search.service';
import { CredentialSearchController } from './controller/Credential-Search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Credential, CredentialSchema } from 'src/modules/admin/credential/schemas/credential.schema';
import { Stem, StemSchema } from 'src/modules/admin/stem/schemas/stem.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Credential.name, schema: CredentialSchema },
    { name: Stem.name, schema: StemSchema },
  ])],
  providers: [CredentialSearchService],
  controllers: [
    CredentialSearchController
  ]
})

export class CredentialSearchModule { }