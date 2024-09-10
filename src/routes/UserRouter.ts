import { Router } from "express";
import { UserComponent } from "@/components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/user
 *
 * @swagger
 * /v1/user:
 *   get:
 *     description: Get all stored user in Database
 *     tags: ["user"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of user
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get("/", UserComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/v1/user/search
 *
 * @swagger
 * /v1/user/search:
 *   post:
 *      description: Search user
 *      tags: ["user"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: user search request body
 *        required: true
 *        content:
 *          application/json:
 *      responses:
 *        201:
 *          description: return search user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/UserSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/search", UserComponent.search);

/**
 * POST method route
 * @example http://localhost:PORT/v1/user
 *
 * @swagger
 * /v1/user:
 *   post:
 *      description: Create new user
 *      tags: ["user"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: user creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSchema'
 *      responses:
 *        201:
 *          description: return created user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/UserSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/", UserComponent.create);

/**
 * POST method route
 * @example http://localhost:PORT/v1/user
 *
 * @swagger
 * /v1/user/{id}:
 *   post:
 *      description: Update user
 *      tags: ["user"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: user creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSchema'
 *      responses:
 *        201:
 *          description: return updated user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/UserSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.patch("/:id", UserComponent.update);

/**
 * GET method route
 * @example http://localhost:PORT/v1/user/:id
 *
 * @swagger
 * /v1/user/{id}:
 *  get:
 *    description: Get user by id
 *    tags: ["user"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return user by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */
router.get("/:id", UserComponent.findOne);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/user/:id
 *
 * @swagger
 * /v1/user/{id}:
 *  delete:
 *    description: Delete user by id
 *    tags: ["user"]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted user
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */
router.delete("/:id", UserComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
