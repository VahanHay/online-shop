import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/updata.product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    getAll() : Promise<Product[]>
    {
        return this.productRepository.find();
    }

    async create(payload: CreateProductDto): Promise<Product>
    {
        const categores = await this.categoryRepository.findByIds([payload.categoryId]);
        if(categores.length === 0)
        { 
            throw new Error('Category not found');
        }

        const product = this.productRepository.create({
            name: payload.name,
            price: payload.price,
            description: payload.description,

            category: categores[0],
        });
        return await this.productRepository.save(product)
    }


    getById(id:number) : Promise<Product>
    {
        return this.productRepository.findOne(id);
    }

    async updateById(id:number,payload : UpdateProductDto) : Promise<void>
    {
        const tmp: Record<any, any> = {};
        if(payload.name)
        {
            tmp.name = payload.name;
        }

        if(payload.price)
        {
            tmp.price = payload.price;
        }
        if(payload.description)
        {
            tmp.description = payload.description;
        }
        await this.productRepository.update(id, tmp);
    }

    async deleteById(id:number) : Promise<void>
    {
        await this.productRepository.delete(id);
    }
}
