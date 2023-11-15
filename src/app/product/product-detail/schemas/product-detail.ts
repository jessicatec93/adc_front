import { Classification } from "src/app/schemas/classification";
import { User } from "src/app/schemas/user";

export class ProductDetail {
    id?: number;
    folio?: string;
    name?: string;
    description?: string;
    price_per_unit?: number;
    expiration_at?: string;
    storage?: number;
    active?: boolean;
    created_at?: string;
    updated_at?: string;
    min_amount?: number;
    classification?: Classification;
    creator?: User;
    updater?: User;
  }