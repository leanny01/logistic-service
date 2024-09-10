import { AuthComponent } from "@/components";
import { Router } from "express";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/login
 *
 * @swagger
 * /auth/login/:
 *  post:
 *    description: Login user to application
 *    tags: ["auth"]
 *    requestBody:
 *      description: login body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TokenRequestSchema'
 *          example:
 *            username: admin
 *            password: admin123
 *    responses:
 *      200:
 *        description: user successfully logged in
 *        headers:
 *          Authorization:
 *            schema:
 *              type: string
 *            description: JWT token
 *        content:
 *          application/json:
 *            example:
 *              message: Token Generation Success!
 *      401:
 *        description: Not logged in, invalid credentials
 *        content:
 *          application/json:
 *            example:
 *              message: Invalid credentials
 */
router.post("/login", AuthComponent.login);

/**
 * @export {express.Router}
 */
export default router;
