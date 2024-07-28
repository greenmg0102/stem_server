import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Stem } from 'src/modules/admin/stem/schemas/stem.schema';

import { ProgramSchoolOrg } from 'src/modules/admin/program-school-org/schemas/program-school-org.schema';
import { ProgramSchoolType } from 'src/modules/admin/program-school-type/schemas/program.school.type.schema';
import { School } from 'src/modules/admin/shool/schemas/school.schema';
import { Opportunity } from 'src/modules/admin/opportuniy/schemas/opportunity.schema';
import { GeneralFieldStudy } from 'src/modules/admin/general-field-study/schemas/general.field.study.service.schema';
import { SpecificFieldStudy } from 'src/modules/admin/general-field-study/schemas/specific.field.study.service.schema';
import { Requirementcredential } from 'src/modules/admin/requirement-credential/schemas/requirement-credential.schema';
import { Requirementage } from 'src/modules/admin/requirement-age/schemas/requirement-age.schema';
import { Educationlevel } from 'src/modules/admin/education-level/schemas/education-level.schema';
import { Credential } from 'src/modules/admin/credential/schemas/credential.schema';

@Injectable()
export class StemService {

  constructor(

    @InjectModel(ProgramSchoolOrg.name) private readonly programSchoolOrgModal: Model<ProgramSchoolOrg>,
    @InjectModel(ProgramSchoolType.name) private readonly programSchoolTypeModal: Model<ProgramSchoolType>,
    @InjectModel(School.name) private readonly schoolModal: Model<School>,
    @InjectModel(Opportunity.name) private readonly opportunityModal: Model<Opportunity>,
    @InjectModel(SpecificFieldStudy.name) private readonly specificFieldStudyModal: Model<SpecificFieldStudy>,
    @InjectModel(GeneralFieldStudy.name) private readonly generalFieldStudyModal: Model<GeneralFieldStudy>,
    @InjectModel(Credential.name) private readonly credentialModal: Model<Credential>,
    @InjectModel(Educationlevel.name) private readonly educationlevelModal: Model<Educationlevel>,
    @InjectModel(Requirementcredential.name) private readonly requirementcredentialModal: Model<Requirementcredential>,
    @InjectModel(Requirementage.name) private readonly requirementageModal: Model<Requirementage>,
    @InjectModel(Stem.name) private readonly stemModal: Model<Stem>
  ) { }

  async read(body: any): Promise<any> {

    // import ProgramSchoolOrg from './tempData1.txt'
    // import ProgramSchoolOrgType from './tempData2.txt'
    // import CredentialsSchool from './tempData3.txt'
    // import SpecificAreaofStudy from './tempData4.txt'
    // import GeneralFieldofStudy from './tempData5.txt'
    // import CourseList from './tempData6.txt'
    // import Credential from './tempData7.txt'
    // import EducationLevel from './tempData8.txt'
    // import ApplicantRequirementCredential from './tempData9.txt'
    // import Age from './tempData10.txt'
    // import OpportunityLink from './tempData11.txt'


    // for (let i = 0; i < body.list.length; i++) {

    //   let programSchoolOrgId = await this.programSchoolOrgModal.findOne({ name: body.list[i][0] }).then((res: any) => { return res._id })
    //   let programSchoolOrgTypeId = await this.programSchoolTypeModal.findOne({ type: body.list[i][1] }).then((res: any) => { return res._id })
    //   let credentialSchoolId = await this.schoolModal.findOne({ school: body.list[i][2] }).then((res: any) => { return res._id })
    //   let SpecificAreaofStudyId = await this.specificFieldStudyModal.findOne({ specificField: body.list[i][3] }).then((res: any) => { return res._id })
    //   let fieldId = await this.generalFieldStudyModal.findOne({ field: body.list[i][4] }).then((res: any) => { return res._id })
    //   let CourseListString = body.list[i][5]
    //   let credentialId = await this.credentialModal.findOne({ credential: body.list[i][6] }).then((res: any) => { return res._id })
    //   let EducationLevel = body.list[i][7]
    //   let ApplicantRequirementCredential = body.list[i][8]
    //   let Age = body.list[i][9]
    //   let OpportunityLink = body.list[i][10]
    //   let OpportunityId = await this.opportunityModal.findOne({ opportunity: body.list[i][11] }).then((res: any) => { return res._id })

    //   let data = {
    //     programSchoolOrg: programSchoolOrgId,
    //     programSchoolOrgType: programSchoolOrgTypeId,
    //     credentialSchool: credentialSchoolId,
    //     SpecificAreaofStudy: SpecificAreaofStudyId,
    //     field: fieldId,
    //     CourseList: CourseListString,
    //     credential: credentialId,
    //     EducationLevel: EducationLevel,
    //     ApplicantRequirementCredential: ApplicantRequirementCredential,
    //     Age: Age,
    //     OpportunityLink: OpportunityLink,
    //     Opportunity: OpportunityId,
    //   }
    //   console.log(i, data);
    //   let newStem = new this.stemModal(data);
    //   await newStem.save()

    // }

    // console.log("body.list", body.list);

    // for (let i = 0; i < body.list.length; i++) {
    //   let data = {
    //     name: body.list[i][0],
    //     address: body.list[i][1],
    //     city: body.list[i][2],
    //     zip: body.list[i][3],
    //     neighborhood: body.list[i][4] === null || body.list[i][4] === undefined ? "N/A" : body.list[i][4],
    //     status: 1
    //   }

    //   console.log(i, data);


    //   let newStem = new this.programSchoolOrgModal(data);
    //   await newStem.save()
    // }


    // console.log("wwwGen", body.list);

    // const wwwGen = this.opportunityModal;

    // const data = body.list.map((item: any) => ({
    //   opportunity: item,
    //   status: 1
    // }));

    // wwwGen.insertMany(data)
    //   .then(result => {
    //     console.log('Data inserted successfully:', result);
    //   })
    //   .catch(error => {
    //     console.error('Error inserting data:', error);
    //   });


    const result = await this.stemModal.aggregate([
      {
        $lookup: {
          from: 'programschoolorgs',
          localField: 'programSchoolOrg',
          foreignField: '_id',
          as: 'schoolOrg',
        },
      },
      {
        $unwind: '$schoolOrg',
      },
      {
        $lookup: {
          from: 'programschooltypes',
          localField: 'programSchoolOrgType',
          foreignField: '_id',
          as: 'schoolOrgType',
        },
      },
      {
        $unwind: '$schoolOrgType',
      },
      {
        $lookup: {
          from: 'schools',
          localField: 'credentialSchool',
          foreignField: '_id',
          as: 'credentialSchool',
        },
      },
      {
        $unwind: '$credentialSchool',
      },
      {
        $lookup: {
          from: 'opportunitys',
          localField: 'Opportunity',
          foreignField: '_id',
          as: 'opportunity',
        },
      },
      {
        $unwind: '$opportunity',
      },
      {
        $lookup: {
          from: 'generalfieldstudys',
          localField: 'field',
          foreignField: '_id',
          as: 'field',
        },
      },
      {
        $unwind: '$field',
      },
      {
        $lookup: {
          from: 'credentials',
          localField: 'credential',
          foreignField: '_id',
          as: 'credential',
        },
      },
      {
        $unwind: '$credential',
      },
      {
        $project: {
          schoolOrg: 1,
          schoolOrgType: 1,
          credentialSchool: 1,
          opportunity: 1,
          field: 1,
          credential: 1
        }
      },
      { $skip: 0 },
      { $limit: 20 }
    ]).exec();

    return {
      isOkay: true,
      result: result.slice(0, 10)
    }

  }


  async dumpCreate(body: any): Promise<any> {

    if (body.name === "ProgramSchoolOrg") {

      console.log("ProgramSchoolOrg");
      await this.programSchoolOrgModal.deleteMany({});

      for (let i = 0; i < body.list.length; i++) {
        console.log(i);
        let newStem = new this.programSchoolOrgModal(body.list[i]);
        await newStem.save()
      }

    } else if (body.name === "CompTIA") {

      console.log("CompTIA");
      await this.programSchoolTypeModal.deleteMany({});

      for (let i = 0; i < body.list.length; i++) {
        let data = { type: body.list[i], status: 1 }
        console.log(i);
        let newStem = new this.programSchoolTypeModal(data);
        await newStem.save()
      }

    } else if (body.name === "Eligible Credits Transfer School / Credentials School") {

      console.log("Eligible Credits Transfer School / Credentials School");
      await this.schoolModal.deleteMany({});

      for (let i = 0; i < body.list.length; i++) {
        let data = { school: body.list[i], status: 1 }
        console.log(i);
        let newStem = new this.schoolModal(data);
        await newStem.save()
      }

    } else if (body.name === "Opportunity") {

      console.log("Opportunity");
      await this.opportunityModal.deleteMany({});

      for (let i = 0; i < body.list.length; i++) {
        let data = { opportunity: body.list[i], status: 1 }
        console.log(i);
        let newStem = new this.opportunityModal(data);
        await newStem.save()
      }

    } else if (body.name === "Specific Area of Study") {

      console.log("Specific Area of Study");
      await this.specificFieldStudyModal.deleteMany({});

      for (let i = 0; i < body.list.length; i++) {
        let data = { specificField: body.list[i], status: 1 }
        console.log(i);
        let newStem = new this.specificFieldStudyModal(data);
        await newStem.save()
      }

    } else if (body.name === "Career Path Category") {

      console.log("Career Path Category");
      await this.generalFieldStudyModal.deleteMany({});

      for (let i = 0; i < body.list.length; i++) {
        let data = { field: body.list[i], status: 1 }
        console.log(i);
        let newStem = new this.generalFieldStudyModal(data);
        await newStem.save()
      }

    } else if (body.name === "Credential") {

      console.log("Credential");
      await this.credentialModal.deleteMany({});

      for (let i = 0; i < body.list.length; i++) {
        let data = { credential: body.list[i], status: 1 }
        console.log(i);
        let newStem = new this.credentialModal(data);
        await newStem.save()
      }

    } else if (body.name === "Applicant Requirement: Education Level") {

      console.log("Applicant Requirement: Education Level");
      await this.educationlevelModal.deleteMany({});

      for (let i = 0; i < body.list.length; i++) {
        let data = { educationlevel: body.list[i], status: 1 }
        console.log(i);
        let newStem = new this.educationlevelModal(data);
        await newStem.save()
      }

    } else if (body.name === "Applicant Requirement: Credential") {

      console.log("Applicant Requirement: Credential");
      await this.requirementcredentialModal.deleteMany({});

      for (let i = 0; i < body.list.length; i++) {
        let data = { requirementcredential: body.list[i], status: 1 }
        console.log(i);
        let newStem = new this.requirementcredentialModal(data);
        await newStem.save()
      }

    } else if (body.name === "Applicant Requirement: Age") {

      console.log("Applicant Requirement: Age");
      await this.requirementageModal.deleteMany({});

      for (let i = 0; i < body.list.length; i++) {
        let data = { requirementage: body.list[i], status: 1 }
        console.log(i);
        let newStem = new this.requirementageModal(data);
        await newStem.save()
      }

    }

    return

  }

  async stemStream(body: any): Promise<any> {

    console.log("~~~ stem ~~~", body.i);

    if (body.i === 0) await this.stemModal.deleteMany({});

    for (let i = 0; i < body.list.length; i++) {

      let programSchoolOrgId = await this.programSchoolOrgModal.findOne({ name: body.list[i][0] }).then((res: any) => { return res === null ? undefined : res._id })
      let programSchoolOrgTypeId = await this.programSchoolTypeModal.findOne({ type: body.list[i][5] }).then((res: any) => { return res === null ? undefined : res._id })
      let credentialSchoolId = await this.schoolModal.findOne({ school: body.list[i][6] }).then((res: any) => { return res === null ? undefined : res._id })
      let OpportunityId = await this.opportunityModal.findOne({ opportunity: body.list[i][7] }).then((res: any) => { return res === null ? undefined : res._id })
      let SpecificAreaofStudyId = await this.specificFieldStudyModal.findOne({ specificField: body.list[i][8] }).then((res: any) => { return res === null ? undefined : res._id })
      let fieldId = await this.generalFieldStudyModal.findOne({ field: body.list[i][9] }).then((res: any) => { return res === null ? undefined : res._id })
      let CourseListString = body.list[i][10]
      let credentialId = await this.credentialModal.findOne({ credential: body.list[i][11] }).then((res: any) => { return res === null ? undefined : res._id })
      let EducationLevelId = await this.educationlevelModal.findOne({ educationlevel: body.list[i][12] }).then((res: any) => { return res === null ? undefined : res._id })
      let ApplicantRequirementCredentialId = await this.requirementcredentialModal.findOne({ requirementcredential: body.list[i][13] }).then((res: any) => { return res === null ? undefined : res._id })
      let AgeId = await this.requirementageModal.findOne({ requirementage: body.list[i][14] }).then((res: any) => { return res === null ? undefined : res._id })
      let OpportunityLink = body.list[i][15]

      let data = {
        programSchoolOrg: programSchoolOrgId,
        programSchoolOrgType: programSchoolOrgTypeId,
        credentialSchool: credentialSchoolId,
        Opportunity: OpportunityId,
        SpecificAreaofStudy: SpecificAreaofStudyId,
        field: fieldId,
        credential: credentialId,
        EducationLevel: EducationLevelId,
        ApplicantRequirementCredential: ApplicantRequirementCredentialId,
        Age: AgeId,
        CourseList: CourseListString,
        OpportunityLink: OpportunityLink,
      }

      console.log(i);
      let newStem = new this.stemModal(data);
      await newStem.save()

    }

  }

  async create(body: any): Promise<any> {

    let real = {}
    Object.keys(body).forEach((key: any) => {
      if (key !== "status") real[key] = body[key]
    })

    console.log('real', real);

    let newStem = new this.stemModal(real);

    let result = await newStem
      .save()
      .then(async (res: any) => {

        const result = await this.stemModal.aggregate([
          {
            $lookup: {
              from: 'programschoolorgs',
              localField: 'programSchoolOrg',
              foreignField: '_id',
              as: 'schoolOrg',
            },
          },
          {
            $unwind: '$schoolOrg',
          },
          {
            $lookup: {
              from: 'programschooltypes',
              localField: 'programSchoolOrgType',
              foreignField: '_id',
              as: 'schoolOrgType',
            },
          },
          {
            $unwind: '$schoolOrgType',
          },
          {
            $lookup: {
              from: 'schools',
              localField: 'credentialSchool',
              foreignField: '_id',
              as: 'credentialSchool',
            },
          },
          {
            $unwind: '$credentialSchool',
          },
          {
            $lookup: {
              from: 'opportunitys',
              localField: 'Opportunity',
              foreignField: '_id',
              as: 'opportunity',
            },
          },
          {
            $unwind: '$opportunity',
          },
          {
            $lookup: {
              from: 'generalfieldstudys',
              localField: 'field',
              foreignField: '_id',
              as: 'field',
            },
          },
          {
            $unwind: '$field',
          },
          {
            $lookup: {
              from: 'credentials',
              localField: 'credential',
              foreignField: '_id',
              as: 'credential',
            },
          },
          {
            $unwind: '$credential',
          },
          {
            $project: {
              schoolOrg: 1,
              schoolOrgType: 1,
              credentialSchool: 1,
              opportunity: 1,
              field: 1,
              credential: 1
            }
          },
          { $skip: 0 },
          { $limit: 20 }
        ]).exec();

        return {
          isOkay: true,
          result: result
        }
      })
      .catch((err: any) => {
        console.log("newBlog saving fail ~~ !");
        return {
          isOkay: false,
          message: "Registration failed"
        }
      });

    return result
  }


}
