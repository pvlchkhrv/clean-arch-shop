import { AggregateRoot } from '../../../shared/domain/aggregate-root.js';
import { ProductId } from '../value-objects/product-id.vo.js';
import { Sku } from '../value-objects/sku.vo.js';
import { Money } from '../../../shared/domain/value-objects/money.vo.js';

export interface ProductProps {
  id: ProductId;
  name: string;
  description: string;
  price: Money;
  sku: Sku;
  stock: number;
  isActive: boolean;
  lowStockThreshold: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Product extends AggregateRoot {
  readonly #id: ProductId;
  readonly #name: string;
  readonly #description: string;
  readonly #price: Money;
  readonly #sku: Sku;
  readonly #stock: number;
  readonly #isActive: boolean;
  readonly #lowStockThreshold: number;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;

  private constructor(props: ProductProps) {
    super();

    this.#id = props.id;
    this.#name = props.name;
    this.#description = props.description;
    this.#price = props.price;
    this.#sku = props.sku;
    this.#stock = props.stock;
    this.#isActive = props.isActive;
    this.#lowStockThreshold = props.lowStockThreshold;
    this.#createdAt = props.createdAt;
    this.#updatedAt = props.updatedAt;
  }

  static create(
    name: string,
    description: string,
    sku: string,
    price: number,
    currency: string,
    stock: number,
  ): Product {
    Product.validateName(name);
    Product.validateStock(stock);

    const now = new Date();

    return new Product({
      id: new ProductId(),
      name,
      description,
      sku: Sku.create(sku),
      price: Money.create(price, currency),
      stock,
      isActive: true,
      lowStockThreshold: 5,
      createdAt: now,
      updatedAt: now,
    });
  }

  get id(): ProductId {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }

  get sku(): Sku {
    return this.#sku;
  }

  get price(): Money {
    return this.#price;
  }

  get stock(): number {
    return this.#stock;
  }

  get isActive(): boolean {
    return this.#isActive;
  }

  get lowStockThreshold(): number {
    return this.#lowStockThreshold;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }

  static reconstitute(props: ProductProps): Product {
    return new Product(props);
  }

  private static validateName(name: string): void {
    if (name.length < 2) {
      throw new Error('Product name must be at least 2 characters');
    }
  }

  private static validateStock(stock: number): void {
    if (stock < 0) {
      throw new Error('Product stock cannot be negative');
    }
  }
}