const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const fetch = require('node-fetch');

const API_BASE_URL =
  /* process.env.GOOGLE_BASE_URL || */ 'https://maps.googleapis.com';

const route = Router();

module.exports = router => {
  router.use('/location', route);

  // address -> geograpgic coordinates
  route.get('/geocode', [check('address').exists()], async (req, res) => {
    // validate query params
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    let coordinates;
    let address;
    try {
      const response = await fetch(
        `${API_BASE_URL}/maps/api/geocode/json?address=${encodeURIComponent(
          req.query.address,
        )}&key=${process.env.GOOGLE_API_KEY}`,
      ).then(resp => resp.json());

      if (response.status === 'OK' && response.status !== 'ZERO_RESULTS') {
        const location = response.results[0];

        address = location.formatted_address;
        coordinates = location.geometry.location;
      } else {
        return res.status(404).send({
          status: response.status,
          msg: `No results for address: ${req.query.address}`,
        });
      }
    } catch (err) {
      return res
        .status(500)
        .send({ status: 'SERVER_ERROR', msg: 'Internal server error' });
    }

    return res.status(200).send({ coordinates, address });
  });

  // geographic coordinates -> address
  route.get(
    '/reverse-geocode',
    [
      check('latlng')
        .exists()
        .isLatLong(),
    ],
    async (req, res) => {
      // validate query params
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      let address;
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            req.query.latlng
          }&key=${process.env.GOOGLE_API_KEY}`,
        ).then(resp => resp.json());

        if (response.status === 'OK' && response.results.length !== 0) {
          const location = response.results[0];
          address = location.formatted_address;
        }
      } catch (err) {
        return res
          .status(500)
          .send({ status: 'SERVER_ERROR', msg: 'Internal server error' });
      }
      return res.status(200).send({ address });
    },
  );
};
