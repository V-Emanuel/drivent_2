import { TicketType, Ticket } from '@prisma/client';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import userRepository from '@/repositories/user-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getAllTicketType(): Promise<TicketType[]> {
  const ticketType = await ticketsRepository.findTicketsTypes();
  if (!ticketType) throw notFoundError();

  return ticketType;
}

async function getTicket(): Promise<Ticket[]> {
  const ticket = await ticketsRepository.findTicket();
  if (!ticket) throw notFoundError();
  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const user = await userRepository.findUserById(userId);
  if (!user) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollmentById(userId);
  if (!enrollment) throw notFoundError();
  const enrollmentId = enrollment.id;
  return await ticketsRepository.createTicket(ticketTypeId, enrollmentId);
}

const ticketsService = {
  getAllTicketType,
  getTicket,
  createTicket,
};

export default ticketsService;
