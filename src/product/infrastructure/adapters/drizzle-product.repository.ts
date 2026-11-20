import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../application/ports/product-repository.port.js';
import {
  DRIZZLE,
  type DrizzleDB,
} from '../../../shared/infrastructure/database/postgres/drizzle.provider.js';
import { Product } from '../../domain/entities/product.entity.js';
import { products } from '../../../shared/infrastructure/database/postgres/schema/index.js';

@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async save(product: Product): Promise<void> {
    const row = DrizzleProductRepository.toPersistence(product);

    await this.db
      .insert(products)
      .values(row)
      .onConflictDoUpdate({
        target: products.id,
        set: {
          name: row.name,
          description: row.description,
          sku: row.sku,
          priceAmount: row.priceAmount,
          priceCurrency: row.priceCurrency,
          stock: row.stock,
          isActive: row.isActive,
          lowStockThreshold: row.lowStockThreshold,
          updatedAt: row.updatedAt,
        },
      });
  }

  async findById(id: string): Promise<Product> {

  }

  async findAll(): Promise<Product[]> {}

  private static toPersistence(product: Product): typeof products.$inferSelect {
    return {
      id: product.id.getValue(),
      name: product.name,
      description: product.description,
      sku: product.sku.getValue(),
      priceAmount: product.price.toCents(),
      priceCurrency: product.price.getCurrency(),
      isActive: product.isActive,
      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}