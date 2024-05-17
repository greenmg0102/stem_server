import { Module } from '@nestjs/common';
import { CredentialService } from './services/credential.service';
import { CredentialController } from './controllers/credential.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Credential, CredentialSchema } from 'src/modules/admin/credential/schemas/credential.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Credential.name, schema: CredentialSchema },
  ])],
  providers: [CredentialService],
  controllers: [
    CredentialController
  ]
})

export class CredentialModule { }