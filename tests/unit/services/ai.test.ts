import OpenAI from 'openai';

// Mock OpenAI
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ message: { content: 'mocked plan' } }],
        }),
      },
    },
  }));
});

// Set dummy API key before importing the service
process.env.OPENAI_API_KEY = 'test-key';

import { askAI } from '../../../src/services/ai';

describe('AI Service', () => {
  it('should return plan content from OpenAI', async () => {
    const plan = await askAI('test prompt', 'test system prompt');
    expect(plan).toBe('mocked plan');
  });
});