import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'chris',
        email: 'chris@mail.com',
        password: 'chris_pass',
        passwordConfirmation: 'chris_pass'
      })
      .expect(200)
  })
})
