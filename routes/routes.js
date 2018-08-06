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
 *         description: user agents
 */
router.get('/user-agents', async (req, res) => {
  let response = await UserAgentModel.find();
  res.send(response);
});
router.post('/user-agents', (req, res) => {
  const { userAgent, uaType, uaBrand } = req.body;
  const newUserAgent = new UserAgentModel({
    userAgent,
    uaType,
    uaBrand
  });

  res.send(newUserAgent.save())
});

module.exports = router;
