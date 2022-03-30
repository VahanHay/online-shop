import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';

@Controller('category')
export class CategoryController {


    constructor(private readonly categoryService: CategoryService){
       
    }
 
     @Post()
    async create(@Body() body: CreateCategoryDto): Promise<Category>
     {
         try{
              return await this.categoryService.create(body);
         }
         catch(err){
             throw new HttpException(err.message, HttpStatus.NOT_FOUND);
         }
     }
     
 
     @Get()
     getAll() : Promise<Category[]>
     {
        return this.categoryService.getAll();
     }
 
     @Get(':id')
     getById(@Param('id') id: string) : Promise<Category>
     {
         return this.categoryService.getById(parseInt(id));
     }
 
     @Put(':id')
     updateById(@Param('id') id: string,@Body() body: CreateCategoryDto) : Promise<void>
     {
        return this.categoryService.updateById(parseInt(id),body);
     }
 
     @Delete(':id')
     deleteById(@Param('id') id: string) : Promise<void>
     {
        return this.categoryService.deleteById(parseInt(id));
     }
}
