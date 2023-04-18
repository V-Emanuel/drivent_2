import { Payment } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import paymentsRepository from '@/repositories/payment-repository';
import { PaymentDataType } from '@/protocols';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

type CreatePayment = {
  paymentInfo: PaymentDataType;
  userId: number;
};

async function getPayments(): Promise<Payment[]> {
  const payments = await paymentsRepository.findPayments();
  if (!payments) throw notFoundError();

  return payments;
}

async function createPayment({ paymentInfo, userId }: CreatePayment) {
  const { ticketId, cardData } = paymentInfo;
  const ticket = await ticketsRepository.findTicket(ticketId);

  if (!ticket) throw notFoundError();

  const ticketType = await ticketsRepository.findTicketTypeById(ticket.ticketTypeId);
  const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId);

  if (!enrollment) throw notFoundError();
  if (enrollment.userId !== userId) throw unauthorizedError();
  await ticketsRepository.updateTicket(ticketId);

  return await paymentsRepository.createPayment({ ticketId, cardData, value: ticketType.price });
}
