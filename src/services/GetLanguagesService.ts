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

    repositories.forEach(repository => {
      const { language } = repository;
      if (!language) return;

      if (languageCounter[language]) {
        languageCounter[language] += 1;
      } else {
        languageCounter[language] = 1;
      }
    });

    let topLanguages = Object.keys(languageCounter).sort((a, b) => {
      return languageCounter[a] > languageCounter[b] ? -1 : 1;
    });

    topLanguages = topLanguages.slice(0, 5);

    return {
      top_language: topLanguages[0],
      top_5_languages: topLanguages,
    };
  }
}

export default GetLanguagesService;
