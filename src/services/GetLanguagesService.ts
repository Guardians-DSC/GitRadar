import GetRepositoriesService from './GetRepositoriesService';
import Repository from '../entities/Repository';
import AppError from '../errors/AppError';
import api from './api';

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
      username,
    );

    const languageCounter: LanguagesDictionary = {};

    const countRepositoryLanguages = async (repository: Repository) => {
      const { full_name } = repository;

      let response;
      try {
        response = await api.get(`/repos/${full_name}/languages`);
      } catch (error) {
        throw new AppError(`Unable to obtain ${full_name} languages.`, 500);
      }
      const languages = response.data;

      Object.keys(languages).forEach(language => {
        if (languageCounter[language]) {
          languageCounter[language] += languages[language];
        } else {
          languageCounter[language] = languages[language];
        }
      });
    };

    const promises = repositories.map(repository =>
      countRepositoryLanguages(repository),
    );
    await Promise.all(promises);

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
