import { Pauta } from '@prisma/client';
import prisma from '../config/prisma';
import { determineTurno } from './helps/determineTurno';

export const organizeAudienciasInPautas = async (): Promise<void> => {
  const audiencias = await prisma.audiencia.findMany();

  const pautasMap = new Map<string, Pauta>();

  for (const audiencia of audiencias) {
    const key = `${audiencia.data}-${determineTurno(audiencia.hora)}-${audiencia.orgao_julgador}-${audiencia.sala}`;

    if (!pautasMap.has(key)) {
      let pauta = await prisma.pauta.findFirst({
        where: {
          data: audiencia.data,
          turno: determineTurno(audiencia.hora),
          orgao_julgador: audiencia.orgao_julgador,
          sala: audiencia.sala,
        },
      });

      if (!pauta) {
        pauta = await prisma.pauta.create({
          data: {
            data: audiencia.data,
            turno: determineTurno(audiencia.hora),
            orgao_julgador: audiencia.orgao_julgador,
            sala: audiencia.sala,
          },
        });
      }

      pautasMap.set(key, pauta);
    }

    const pauta = pautasMap.get(key)!; // Pauta agora é garantidamente não nula

    await prisma.audiencia.update({
      where: { id: audiencia.id },
      data: { pautaId: pauta.id },
    });
  }
};
