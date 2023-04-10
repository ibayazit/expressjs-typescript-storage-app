import request from 'supertest';
import { describe, test } from '@jest/globals';
import { app } from '../app';

describe('Welcome Routes Test', () => {
  test('GET /', () => {
    return request(app).get("/").expect(200);
  });

  test('GET /not-found-url', () => {
    return request(app).get("/not-found-url").expect(404);
  });
});