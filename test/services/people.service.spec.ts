import { People, Address } from '@interfaces';
import { PeopleService } from '@services';

describe('People Service Tests', () => {
  let peopleService: PeopleService;

  beforeAll(() => {
    peopleService = new PeopleService();
  });

  describe('Walk Tests', () => {
    it('walks_withSuccess', () => {
      // Arrange
      const people: People = {
        age: 18,
        job: 'Programador',
        name: 'Um Rapaz Legal',
        walked: 0,
      };

      // Act
      peopleService.walk(people);

      // Assert
      expect(people.walked).toBe(1);
    });

    it('goToDestinyWithAddress_withSuccess', () => {
      // Arrange
      const people: People = {
        age: 18,
        job: 'Programador',
        name: 'Um Rapaz Legal',
        walked: 0,
      };

      const address: Address = {
        cep: '95600466',
        city: 'Cidade Alegre',
        number: 123123,
        state: 'Estado do Sul',
        street: 'Rua Legalzona',
        walkingDistance: 10,
      };

      jest.spyOn(peopleService, 'walk');

      // Act
      peopleService.goToDestinyWithAddress(people, address);

      // Assert
      expect(people.walked).toBe(address.walkingDistance);
      expect(peopleService.walk).toBeCalledTimes(address.walkingDistance);
    });
  });
});
