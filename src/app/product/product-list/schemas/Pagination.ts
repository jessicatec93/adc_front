import { Meta } from "src/app/schemas/meta";
import { Product } from "./product";
import { Link } from "src/app/schemas/link";

export class Pagination {
    data: Product[] = [];
    meta: Meta = {};
    links: Link[] = [];
}