import { ViacepResponse } from '@interfaces';
import { AddressService } from '@services';

describe('Address Service Tests', () => {
  let addressService: AddressService;

  beforeAll(() => {
    addressService = new AddressService();
  });

  describe('Get Address From Cep Tests', () => {
    it('getAddressFromCep_withSuccess', async () => {
      // Arrange
      const cep: string = '95600466';
      const viacepResponse: ViacepResponse = {
        bairro: 'João Pessoa',
        cep: '956000466',
        complemento: '',
        ddd: 51,
        erro: false,
        gia: 123,
        ibge: 123,
        localidade: 'Cidade Alegre',
        logradouro: 'Bairro Feliz',
        siafi: 123123,
        uf: 'RS',
      };

      jest.spyOn(addressService.request, 'get').mockResolvedValueOnce(viacepResponse);

      // Act
      const result: ViacepResponse = await addressService.getAddressFromCep(cep);

      // Assert
      expect(addressService.request.get).toBeCalledTimes(1);
      expect(result).toEqual(viacepResponse);
    });

    it('getAddressFromCep_withViacepError_withError', async () => {
      // Arrange
      const cep: string = '95600466';
      const viacepResponse: ViacepResponse = {
        bairro: null,
        cep: null,
        complemento: null,
        ddd: null,
        erro: true,
        gia: null,
        ibge: null,
        localidade: null,
        logradouro: null,
        siafi: null,
        uf: null,
      };

      jest.spyOn(addressService.request, 'get').mockImplementation(async () => {
        return viacepResponse;
      });

      // Act
      const action: Function = async () => await addressService.getAddressFromCep(cep);

      // Assert
      expect(action).rejects.toThrow();
      expect(action).rejects.toThrow('Erro na request para a viacep');
    });

    it('getAddressFromCep_withError', async () => {
      // Arrange
      const cep: string = '95600466';

      jest.spyOn(addressService.request, 'get').mockImplementation(() => {
        throw new Error('Mensagem de erro padrão');
      });

      // Act
      const action: Function = async () => await addressService.getAddressFromCep(cep);

      // Assert
      expect(action).rejects.toThrow();
      expect(action).rejects.toThrow('Mensagem de erro padrão');
    });
  });
});
