import { ProductDetail } from "src/app/product/product-detail/schemas/product-detail";
import { User } from "src/app/schemas/user";
import { OrderStatus } from "../../schemas/order_status";

export class OrderDetail {
  id?: number;
  folio?: string;
  delivery_at?: string;
  deadline_at?: string;
  active?: boolean;
  description?: string;
  price_per_unit?: number;
  total_price?: number;
  required_quantity?: number;
  created_at?: string;
  updated_at?: string;
  status?: OrderStatus;
  product?: ProductDetail;
  creator?: User;
  updater?: User;
}