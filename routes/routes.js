const router = require('express').Router();
const { UserAgentModel } = require('../models/UserAgent');

/**
   * @swagger
   * tags:
   *   - name: User Agents
   *     description: Data about IP address, browsers, operating systems, etc.
   */

/**
 * @swagger
 * /user-agents:
 *   get:
 *     description: Get a list of user agents
 *     tags: [User Agents]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: retrieved user agents
 */
router.get('/user-agents', async (req, res) => {
  let response = await UserAgentModel.find();
  res.send(response);
});

/**
 * @swagger
 * /user-agents:
 *   post:
 *     description: Add a new user agent
 *     tags: [User Agents]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: created user agent
 */
router.post('/user-agents', (req, res) => {
  const { ...userAgentFields } = req.body;
  const newUserAgent = new UserAgentModel( userAgentFields );

  res.send(newUserAgent.save())
});

module.exports = router;
