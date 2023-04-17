import { Router } from 'express';
import { getTicketsType, getTicket, postTicket } from '@/controllers/tickets-controller';

const ticketsRoute = Router();

ticketsRoute.get('/type', getTicketsType);
ticketsRoute.get('/', getTicket);
ticketsRoute.post('/', postTicket);

export { ticketsRoute };
