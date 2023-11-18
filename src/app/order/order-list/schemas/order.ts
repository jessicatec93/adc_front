import { OrderStatus } from "../../schemas/order_status";

export class Order {
    id?: number;
    folio?: string;
    delivery_at?: string;
    deadline_at?: string;
    status?: OrderStatus;
    active?: boolean;
    created_at?: string;
    total_price?: number;
  }