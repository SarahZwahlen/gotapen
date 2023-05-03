import { companyRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/company.repository.inMemory';
import { userRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/user.resposotory.InMemory';

describe('Get employees list of a company', () => {
    beforeEach(() => userRepoInMemory.reset());
    beforeEach(() => companyRepoInMemory.reset());

    test('Happy path', () => {});
});
