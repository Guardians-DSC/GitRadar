import api from './api';
import GetRepositoriesService from './GetRepositoriesService';
import Repository from '../entities/Repository';

interface Response {
  top_language: string;
  top_5_languages: string[];
}

interface LanguagesDictionary {
  [language: string]: number;
}

class GetLanguagesService {
  public async execute(username: string): Promise<Response> {
    const getRepositoriesService = new GetRepositoriesService();
    const repositories: Repository[] = await getRepositoriesService.execute(
      username
    );

    const languageCounter: LanguagesDictionary = {};

    for (let i = 0; i < repositories.length; i++) {
      const repository = repositories[i];

      const response = await api.get(
        `/repos/${username}/${repository.name}/languages`
      );
      const languages: LanguagesDictionary = response.data;

      Object.keys(languages).forEach(item => {
        if (languageCounter[item]) {
          languageCounter[item] += languages[item];
        } else {
          languageCounter[item] = languages[item];
        }
      });
    }

    let topLanguages = Object.keys(languageCounter).sort((a, b) => {
      return languageCounter[a] > languageCounter[b] ? -1 : 1;
    });

    topLanguages = topLanguages.slice(0, 6);

    return {
      top_language: topLanguages[0],
      top_5_languages: topLanguages,
    };
  }
}

export default GetLanguagesService;
