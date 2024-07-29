import { Audiencia } from "@prisma/client";
import { AudienciaRepository } from "../repositories/AudienciaRepository";

export class AudienciaService {
    private audienciaRepository: AudienciaRepository;

    constructor() {
        this.audienciaRepository = new AudienciaRepository();
    }

    async createAudiencia(data: Omit<Audiencia, 'id' | 'createdAt' | 'updatedAt'>): Promise<Audiencia> {
        return this.audienciaRepository.create(data);
    }

    async getAllAudiencias(): Promise<Audiencia[]> {
        return this.audienciaRepository.findAll();
    }

    async getAudienciaById(id: number): Promise<Audiencia | null> {
        return this.audienciaRepository.findById(id);
    }

    async updateAudiencia(id: number, data: Partial<Omit<Audiencia, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Audiencia> {
        return this.audienciaRepository.update(id, data);
    }

    async deleteAudiencia(id: number): Promise<Audiencia> {
        return this.audienciaRepository.delete(id);
    }
}