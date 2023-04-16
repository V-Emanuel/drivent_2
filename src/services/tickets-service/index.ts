import { TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';

async function getAllTicketType(): Promise<TicketType[]> {
  const ticketType = await ticketsRepository.getTicketsTypes();
  if (!ticketType) throw notFoundError();

  return ticketType;
}

const ticketsService = {
  getAllTicketType,
};

export default ticketsService;
