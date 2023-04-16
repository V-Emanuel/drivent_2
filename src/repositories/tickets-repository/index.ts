import { prisma } from '@/config';

async function getTicketsTypes() {
  const data = await prisma.ticketType.findMany();
  return data;
}
const ticketsRepository = {
  getTicketsTypes,
};

export default ticketsRepository;
