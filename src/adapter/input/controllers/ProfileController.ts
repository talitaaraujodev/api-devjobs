import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import { InjectionTokens } from '../../../utils/types/InjectionTokens';
import { ProfileServiceInputPort } from '../../../application/ports/input/ProfileServiceInputPort';
import { Profile } from '../../../application/domain/models/Profile';
import { BaseError } from '../../../utils/errors/BaseError';

@injectable()
export class ProfileController {
  constructor(
    @inject(InjectionTokens.PROFILE_SERVICE_INPUT_PORT)
    private profileServiceInputPort: ProfileServiceInputPort,
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const file = request.file as Express.Multer.File;
      const {
        birthDate,
        phone,
        cep,
        logradouro,
        number,
        bairro,
        statusCivil,
        userId,
      } = request.body;

      const profile = await this.profileServiceInputPort.create({
        birthDate,
        phone,
        cep,
        logradouro,
        number,
        bairro,
        statusCivil,
        curriculumFilename: file.filename,
        curriculumOriginalname: file.originalname,
        userId,
      } as Profile);

      return response
        .json({
          message: 'Perfil criado com sucesso',
          profile,
        })
        .status(201);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.code)
          .json({ message: e.message, status: e.code, errors: e.errors });
      }
      return response.json(e).status(500);
    }
  }
  async downloadCurriculum(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const id = request.params.id;
      const profile = await this.profileServiceInputPort.findByUserid(id);
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'uploads',
        profile.curriculumFilename,
      );
      response.setHeader(
        'Content-Disposition',
        `attachment; filename="${profile.curriculumOriginalname}"`,
      );
      response.download(filePath, profile.curriculumOriginalname, (err) => {
        if (err) {
          console.error('Erro ao baixar o arquivo:', err);
          response.status(500).send('Erro ao baixar o arquivo.');
        } else {
          response.end();
        }
      });
      return response;
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.code)
          .json({ message: e.message, code: e.code, errors: e.errors });
      }
      return response.json(e).status(500);
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      const profile = await this.profileServiceInputPort.findOne(id);
      return response.json(profile).status(200);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.code)
          .json({ message: e.message, code: e.code, errors: e.errors });
      }
      return response.json(e).status(500);
    }
  }

  async findByUserId(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request.params.userId;
      const profile = await this.profileServiceInputPort.findByUserid(userId);
      return response.json(profile).status(200);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.code)
          .json({ message: e.message, code: e.code, errors: e.errors });
      }
      return response.json(e).status(500);
    }
  }
}
