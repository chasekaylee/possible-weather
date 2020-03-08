const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const fetch = require('node-fetch');

const API_BASE_URL =
  /* process.env.DARK_SKY_BASE_URL|| */ 'https://api.darksky.net';

const route = Router();

module.exports = router => {
  router.use('/weather', route);

  route.get(
    '/forecast',
    [
      check('latlng')
        .exists()
        .isLatLong(),
      check('units').exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      try {
        const { currently, daily } = await fetch(
          `${API_BASE_URL}/forecast/${process.env.DARK_SKY_API_KEY}/${
            req.query.latlng
          }?units=${req.query.units}`,
        ).then(resp => resp.json());

        if (!currently || !daily) {
          throw new Error('Could not get the current forecast data');
        }

        return res.status(200).send({ currently, daily });
      } catch (err) {
        return res
          .status(500)
          .send({ status: 'SERVER_ERROR', msg: 'Internal server error' });
      }
    },
  );
};
