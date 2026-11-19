import { UniqueId } from '../../../shared/domain/value-objects/unqiue-id.vo.js';

export class ProductId extends UniqueId {
  constructor(id?: string) {
    super(id);
  }
}