import { MetaLink } from "./meta-link";

export class Meta {
  current_page?: number;
  from?: number;
  last_page?: number;
  links?: MetaLink[] = [];
  path?: string;
  per_page?: number;
  to?: number;
  total?: number;
}