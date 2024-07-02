import citiesRepository from '../repository/worldCitiesRespository';

export const getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository();
    return ctx;
};

export const getCitiesByCountryUseCase = (ctx) => {
    const cities = citiesRepository.searchCitiesByCountryName(ctx.params.country);
    if (cities.length === 0) {
        ctx.status = 400;
        ctx.body = { message: "No se encontraron ciudades para el país ingresado" };
    } else {
        ctx.status = 200;
        ctx.body = cities;
    }
    return ctx;
};

export const getCitiesByCityNameAndCountryUseCase = (ctx) => {
    const { city, country } = ctx.params;
    const cityData = citiesRepository.searchCityByCityNameAndCountry(city, country);

    if (!cityData) {
        ctx.status = 400;
        ctx.body = { message: "No se encontraron ciudades para el país ingresado" };
    } else {
        ctx.body = cityData;
    }

    return ctx;
};