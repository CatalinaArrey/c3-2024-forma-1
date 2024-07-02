const request = require('supertest');
const { server, app } = require('../../src/index');
const citiesRepository = require('../../src/domain/cities/repository/worldCitiesRespository');

jest.mock('../../src/domain/cities/repository/worldCitiesRespository', () => ({
    getAllCitiesRepository: jest.fn(),
    searchCitiesByCountryName: jest.fn(),
    searchCityByCityNameAndCountry: jest.fn(),
}));

describe('GET api/cities/by_country/:country', () => {

    test('should return an array of cities for a valid country', async () => {
        const mockCities = [{ name: 'New York' }, { name: 'Los Angeles' }];
        citiesRepository.searchCitiesByCountryName.mockReturnValue(mockCities);

        const response = await request(server).get('/api/cities/by_country/USA');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(mockCities);
    });

    test('should handle internal server errors', async () => {
        citiesRepository.searchCitiesByCountryName.mockImplementation(() => {
            throw new Error('Internal Server Error');
        });

        const response = await request(server).get('/by_country/USA');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    });

    test('should return 400 for country length less than 3', async () => {
        const response = await request(server).get('/by_country/US');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "El país/ciudad ingresado debe tener al menos 3 caracteres" });
    });

    test('should return a message when no cities are found for the country', async () => {
        citiesRepository.searchCitiesByCountryName.mockResolvedValue([]);

        const response = await request(server).get('/api/cities/by_country/NonExistentCountry');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "No se encontraron ciudades para el país ingresado" });
    });

    test('should return 400 and a message for numeric country parameter', async () => {
        const response = await request(server).get('/api/cities/by_country/123');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({message: 'Solo se aceptan caracteres no numéricos' });
    });

    afterAll((done) => {
        server.close(done);
    });
});
