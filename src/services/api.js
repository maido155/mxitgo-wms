import { stringify } from 'qs';
import request from '@/utils/request';
import { async } from 'q';


/***********GET VIDEOJUEGOS -ARMANDO-***************/
export async function getVideoGames({ consolesId }) {
  return request(
    `${ANT_DESIGN_PRO_TARGET}/videogames?consolesId=${consolesId}`
    );
}
/***************************************************/

/***********POST VIDEOJUEGOS -ARMANDO-***************/
export async function generateVideogames({ payload }) {
  return request(`${ANT_DESIGN_PRO_TARGET}/videogames`,{
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload.POST),
  });
}
/***************************************************/