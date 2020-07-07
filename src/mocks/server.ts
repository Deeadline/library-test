import {rest, setupWorker} from 'msw';
import {setupServer} from 'msw/node';
import {handlers} from './handlers';

const server = setupServer(...handlers);
const worker = setupWorker(...handlers);
worker.start();
export {worker, server, rest};
