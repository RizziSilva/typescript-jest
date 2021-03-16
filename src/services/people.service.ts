import { People, Address, ViacepResponse } from '@interfaces';
import { AddressService } from '@services';
import { ViacepConverter } from '@converters';

export class PeopleService {
  addressService: AddressService;
  viacepConverter: ViacepConverter;

  constructor() {
    this.addressService = new AddressService();
    this.viacepConverter = new ViacepConverter();
  }

  walk(people: People) {
    people.walked++;
  }

  goToDestinyWithAddress(people: People, address: Address) {
    let walkCount = 0;

    while (walkCount < address.walkingDistance) {
      this.walk(people);
      walkCount++;
    }
  }

  async goToDestinyWithCep(
    people: People,
    cep: string,
    estimatedWalkingDistance: number,
    houseNumber: number,
  ) {
    try {
      const viacepResponse: ViacepResponse = await this.addressService.getAddressFromCep(cep);
      const addressToUse = this.viacepConverter.viacepToAddress(
        viacepResponse,
        estimatedWalkingDistance,
        houseNumber,
      );

      this.goToDestinyWithAddress(people, addressToUse);
    } catch (error) {
      throw error;
    }
  }
}
