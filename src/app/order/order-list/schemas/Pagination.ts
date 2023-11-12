import { Meta } from "src/app/schemas/meta";
import { Order } from "./order";
import { Link } from "src/app/schemas/link";

export class Pagination {
    data: Order[] = [];
    meta: Meta = {};
    links: Link[] = [];
}