import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from './presentation/product.controller.js';
import { PRODUCT_REPOSITORY } from './application/ports/product-repository.port.js';
import { DrizzleProductRepository } from './infrastructure/adapters/drizzle-product.repository.js';
import { CommandHandlers } from './application/index.js';

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [
    ...CommandHandlers,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: DrizzleProductRepository
    },
  ],
})
export class ProductModule {}