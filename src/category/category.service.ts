import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create.category.dto';


@Injectable()
export class CategoryService {
    constructor(
        
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}
    


    getAll() : Promise<Category[]>
    {
        return this.categoryRepository.find();
    }

    async create(payload: CreateCategoryDto): Promise<Category>
    {
        const product = this.categoryRepository.create({
            name: payload.name,
        });
        return await this.categoryRepository.save(product)
    }

    getById(id:number) : Promise<Category>
    {
        return this.categoryRepository.findOne(id);
    }

    async updateById(id:number,payload : CreateCategoryDto) : Promise<void>
    {
        await this.categoryRepository.update(id,{
            name: payload.name,
        });
    }

    async deleteById(id:number) : Promise<void>
    {
        await this.categoryRepository.delete(id);
    }
}
