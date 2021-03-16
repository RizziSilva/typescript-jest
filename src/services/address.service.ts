import { ViacepResponse } from '@interfaces';
import { Request } from '@request';

export class AddressService {
  request: Request;

  constructor() {
    this.request = new Request();
  }

  async getAddressFromCep(cep: string) {
    try {
      const viacepResponse: ViacepResponse = await this.request.get(`/${cep}/json`, {});

      if (viacepResponse.erro) throw new Error('Erro na request para a viacep');

      return viacepResponse;
    } catch (error) {
      throw error;
    }
  }
}
