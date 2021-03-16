import { ViacepResponse, Address } from '@interfaces';

export class ViacepConverter {
  constructor() {}

  viacepToAddress(viacep: ViacepResponse, walkingDistance: number, houseNumber: number) {
    const address: Address = {
      cep: viacep.cep,
      city: viacep.localidade,
      number: houseNumber,
      state: viacep.uf,
      street: viacep.logradouro,
      walkingDistance: walkingDistance,
    };

    return address;
  }
}
