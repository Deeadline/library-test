import {rest} from 'msw';

export const handlers = [
  rest.get('/books', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('is-authenticated');
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authenticated'
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json([
        {
          bookId: 0,
          title: 'Harry Potter',
          author: 'J.K. Rowling',
          releaseDate: 1999
        }
      ])
    );
  }),
  rest.post('/books', (req, res, ctx) => {
    const {book} = req.body as any;
    book.id = 1;
    return res(
      ctx.status(201),
      ctx.json(book)
    )
  }),
  rest.put('/books/:bookId', null),
  rest.post('/books/:bookId/comments', null),
  rest.put('/books/:bookId/comments/:commentId', null),
  rest.post('/books/:bookId/rates', null),
  rest.put('/books/:bookId/rates/:rateId', null),
  rest.post('/login', (request, response, context) => {
    sessionStorage.setItem('is-authenticated', 'true');
    return response(context.status(200));
  }),
  rest.post('/register', null),
];
