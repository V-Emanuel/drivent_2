import dayjs from 'dayjs';
import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { TicketReturn } from '@/protocols';

async function findTicketsTypes() {
  const data = await prisma.ticketType.findMany();
  return data;
}

async function findTicket(userId: number): Promise<Ticket> {
  const data = await prisma.ticket.findFirst({
    where: {
      id: userId,
    },
  });
  return data;
}
async function findTicketTypeById(ticketTypeId: number): Promise<TicketType> {
  const data = await prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
  });
  return data;
}

async function createTicket(ticketTypeId: number, enrollmentId: number): Promise<TicketReturn> {
  await prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: 'RESERVED',
    },
  });

  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function updateTicket(ticketId: number) {
  return await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: 'PAID',
    },
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findTicket,
  createTicket,
  updateTicket,
  findTicketTypeById,
};

export default ticketsRepository;
