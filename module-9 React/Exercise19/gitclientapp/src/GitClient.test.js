import axios from 'axios';
import GitClient from './GitClient';

// Mock the axios library
jest.mock('axios');

describe('Git Client Tests', () => {
  test('should return repository names for techiesyed', () => {
    const mockRepoPayload = [
      { id: 1, name: 'react-mock-repo' },
      { id: 2, name: 'javascript-algorithms' },
      { id: 3, name: 'deep-learning-notes' }
    ];

    // Intercept axios.get and return mock payload
    axios.get.mockResolvedValue({ data: mockRepoPayload });

    const client = new GitClient();

    // Invoke client and assert returned array values
    return client.getRepositories('techiesyed').then(data => {
      expect(data).toEqual(['react-mock-repo', 'javascript-algorithms', 'deep-learning-notes']);
      expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/techiesyed/repos');
    });
  });
});
