import { Router } from "express";
import { LeadComponent } from "@/components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * GET method route
 * @example http://localhost:PORT/v1/lead
 *
 * @swagger
 * /v1/lead:
 *   get:
 *     description: Get all stored lead in Database
 *     tags: ["lead"]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of lead
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/LeadSchema'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get("/", LeadComponent.findAll);

/**
 * POST method route
 * @example http://localhost:PORT/v1/lead/search
 *
 * @swagger
 * /v1/lead/search:
 *   post:
 *      description: Search lead
 *      tags: ["lead"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: lead search request body
 *        required: true
 *        content:
 *          application/json:
 *      responses:
 *        201:
 *          description: return search lead
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/LeadSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/search", LeadComponent.search);

/**
 * POST method route
 * @example http://localhost:PORT/v1/lead
 *
 * @swagger
 * /v1/lead:
 *   post:
 *      description: Create new lead
 *      tags: ["lead"]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: lead creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LeadSchema'
 *      responses:
 *        201:
 *          description: return created lead
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/LeadSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/", LeadComponent.create);

/**
 * PATCH method route
 * @example http://localhost:PORT/v1/lead
 *
 * @swagger
 * /v1/lead/{id}:
 *   patch:
 *      description: Update lead
 *      tags: ["lead"]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the item to update
 *          required: true
 *          schema:
 *            type: string
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        description: lead update request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LeadSchema'
 *      responses:
 *        201:
 *          description: return updated lead
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/LeadSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.patch("/:id", LeadComponent.update);

/**
 * GET method route
 * @example http://localhost:PORT/v1/lead/:id
 *
 * @swagger
 * /v1/lead/{id}:
 *  get:
 *    description: Get lead by id
 *    tags: ["lead"]
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
 *        description: return lead by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/LeadSchema'
 */
router.get("/:id", LeadComponent.findOne);

/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/lead/:id
 *
 * @swagger
 * /v1/lead/{id}:
 *  delete:
 *    description: Delete lead by id
 *    tags: ["lead"]
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
 *        description: return deleted lead
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/LeadSchema'
 */
router.delete("/:id", LeadComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
