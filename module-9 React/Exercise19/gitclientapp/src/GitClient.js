import axios from 'axios';

class GitClient {
  getRepositories(username) {
    return axios.get('https://api.github.com/users/' + username + '/repos')
      .then(response => {
        // Return only an array of repository name strings
        return response.data.map(repo => repo.name);
      });
  }
}

export default GitClient;
