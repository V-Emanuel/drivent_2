import dayjs from 'dayjs';
import { prisma } from '@/config';
import { TicketReturn } from '@/protocols';

async function findTicketsTypes() {
  const data = await prisma.ticketType.findMany();
  return data;
}
async function findTicket() {
  const data = await prisma.ticket.findMany();
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

const ticketsRepository = {
  findTicketsTypes,
  findTicket,
  createTicket,
};

export default ticketsRepository;
