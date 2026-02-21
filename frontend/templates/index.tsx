import SaaSModern from "./saas-modern"
import RestaurantElegant from "./restaurant-elegant"

export const TEMPLATE_REGISTRY: Record<string, any> = {
  "saas-modern": SaaSModern,
  "restaurant-elegant": RestaurantElegant,
}