import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { ensureAuthorized } from "@/middlewares/ensure-authorized";
import { Router } from "express";



const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController()

deliveryLogsRoutes.post("/",
  ensureAuthenticated,
  ensureAuthorized(["sale"]),
  deliveryLogsController.create
)

deliveryLogsRoutes.get(
  "/:delivery_id/show",
  ensureAuthenticated,
  ensureAuthorized(["sale", 'customer']),
  deliveryLogsController.show)


export { deliveryLogsRoutes }