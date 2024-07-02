import worldCitiesDataset from '../../../../dataset/world-cities_json.json';

export const getAllCitiesRepository = () => {
    return worldCitiesDataset;
};

export const searchCitiesByCountryName = (inputCountryName) => {
    const result = worldCitiesDataset.filter(cityObject =>
        cityObject.country.toLowerCase() === inputCountryName.toLowerCase()
    );
    return result;
};

export const searchCityByCityNameAndCountry = (inputCityName, inputCountryName) => {
    const filteredCity = worldCitiesDataset.filter(cityObject =>
        cityObject.name.toLowerCase() === inputCityName.toLowerCase() &&
        cityObject.country.toLowerCase() === inputCountryName.toLowerCase()
    );
    return filteredCity.length > 0 ? filteredCity[0] : null;
};
