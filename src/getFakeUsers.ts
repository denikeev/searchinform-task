import { faker } from '@faker-js/faker';
import { uniqueId } from 'lodash';
import { type User } from './types/User';

export const createFakeUser = (): User => {
  return {
    id: uniqueId(),
    name: faker.internet.userName(),
    company: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
    department: faker.commerce.department(),
    activeStatus: faker.datatype.boolean(),
    avatarPath: faker.helpers.arrayElement(['./src/assets/male.jpg', './src/assets/female.jpg']),
  };
};

export default (count: number): User[] => faker.helpers.multiple(createFakeUser, { count });