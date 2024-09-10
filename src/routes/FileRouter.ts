import { FileComponent } from "@/components";
import { Router } from "express";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/file
 *
 * @swagger
 * /upload/:
 *  post:
 *    description: File Upload
 *    tags: ["File Upload"]
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *      description: list of file
 *      required: true
 *      content:
 *        multipart/form-data:
 *    responses:
 *      200:
 *        description: Upload file
 *        headers:
 *          Authorization:
 *            schema:
 *              type: string
 *            description: JWT token
 *        content:
 *          appication/json:
 *      401:
 *        description: Not logged in, invalid inputs
 *        content:
 *          application/json:
 *            example:
 *              message: Invalid inputs
 */
router.post("/upload", FileComponent.upload);

/**
 * POST method route
 * @example http://localhost:PORT/file
 *
 * @swagger
 * /upload/:
 *  post:
 *    description: File Upload
 *    tags: ["File Upload"]
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *      description: Read file
 *      required: true
 *      content:
 *        application/json:
 *    responses:
 *      200:
 *        description: Read file
 *        headers:
 *          Authorization:
 *            schema:
 *              type: string
 *            description: JWT token
 *        content:
 *          appication/json:
 *      401:
 *        description: Not logged in, invalid inputs
 *        content:
 *          application/json:
 *            example:
 *              message: Invalid inputs
 */
router.get("/read/:name", FileComponent.read);

/**
 * @export {express.Router}
 */
export default router;
