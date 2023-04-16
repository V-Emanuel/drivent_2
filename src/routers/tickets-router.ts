import { Router } from 'express';
import { getTicketsType } from '@/controllers/tickets-controller';

const ticketsRoute = Router();

ticketsRoute.get('/type', getTicketsType);

export { ticketsRoute };
