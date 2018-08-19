const router = require('express').Router();
const { UserAgent } = require('../models/UserAgent');
const { PageVisit } = require('../models/PageVisit');

/**
   * @swagger
   * tags:
   *   - name: User Agents
   *     description: Data about browser, operating system, etc.
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
  let response = await UserAgent.find();
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
  const newUserAgent = new UserAgent( userAgentFields );

  res.send(newUserAgent.save())
});

/**
   * @swagger
   * tags:
   *   - name: Page Visits
   *     description: Data about path, referrer, user agent, ip address, etc.
   */

/**
 * @swagger
 * /page-visits:
 *   get:
 *     description: Get a list of page visits
 *     tags: [Page Visits]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: retrieved page visits
 */
router.get('/page-visits', async (req, res) => {
  let response = await PageVisit.find();
  res.send(response);
});

module.exports = router;
