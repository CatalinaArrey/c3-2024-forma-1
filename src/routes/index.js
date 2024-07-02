import Router from 'koa-router';
import getHealth from './health/health';
import * as getCitiesUseCase from '../domain/cities/use_cases/getCities';

const router = new Router();

router.get('/by_country/:country', async (ctx) => {
  const { country } = ctx.params;
  if (!/^[a-zA-Z]+$/.test(country)) {
    ctx.status = 400;
    ctx.body = { message: 'Solo se aceptan caracteres no numéricos' };
    return;
  }

  if (country.length < 3) {
    ctx.status = 400;
    ctx.body = { message: "El país/ciudad ingresado debe tener al menos 3 caracteres" };
    return;
  }

  try {
    const cities = await getCitiesUseCase.getCitiesByCountryUseCase(ctx);
    ctx.status = 200;
    ctx.body = cities;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

router.get('/health', getHealth);

router.get('/api/cities', getCitiesUseCase.getAllCitiesUseCase);
router.get('/api/cities/by_country/:country', getCitiesUseCase.getCitiesByCountryUseCase);
router.get('/api/city/:city/country/:country', getCitiesUseCase.getCitiesByCityNameAndCountryUseCase);

export default router;
