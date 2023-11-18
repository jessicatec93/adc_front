export class OrderCreate {
  delivery_at?: string;
  deadline_at?: string;
  description?: string;
  price_per_unit?: number;
  total_price?: number;
  required_quantity?: number;
  status_id?: number;
  product_id?: number;
}