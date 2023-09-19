import { faker } from '@faker-js/faker';
import { uniqueId } from 'lodash';

export type User = {
  id: string;
  name: string;
  company: string;
  jobTitle: string;
  department: string;
  activeStatus: boolean;
  avatarPath: string;
}

export const createFakeUser = (): User => {
  return {
    id: uniqueId(),
    name: faker.internet.userName(),
    company: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
    department: faker.commerce.department(),
    activeStatus: faker.datatype.boolean(),
    avatarPath: faker.helpers.arrayElement(['firstPath', 'secondPath']),
  };
};

export default (count: number): User[] => faker.helpers.multiple(createFakeUser, { count });