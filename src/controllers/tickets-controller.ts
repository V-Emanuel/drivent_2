import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';

export async function getTicketsType(req: Request, res: Response) {
  try {
    const tickets = await ticketsService.getAllTicketType();
    return res.status(httpStatus.OK).send(tickets);
  } catch (err) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
