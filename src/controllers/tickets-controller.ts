import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketsType(req: Request, res: Response) {
  try {
    const tickesType = await ticketsService.getAllTicketType();
    return res.status(httpStatus.OK).send(tickesType);
  } catch (err) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getTicket(req: Request, res: Response) {
  const userId = res.locals.userId;
  try {
    const ticket = await ticketsService.getTicket(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (err) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function postTicket(req: Request, res: Response, next: NextFunction) {
  const userId = res.locals.userId;
  const { ticketTypeId } = req.body;
  try {
    const ticket = await ticketsService.createTicket(userId, ticketTypeId);
    res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name != 'UnauthorizedError') return next(error);
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
