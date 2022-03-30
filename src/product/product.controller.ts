import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/updata.product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    
   constructor(private readonly productService: ProductService){
       
   }

    @Post()
   async create(@Body() body: CreateProductDto): Promise<Product>
    {
        try{
             return await this.productService.create(body);
        }
        catch(err){
            throw new HttpException(err.message, HttpStatus.NOT_FOUND);
        }
    }
    

    @Get()
    getAll() : Promise<Product[]>
    {
       return this.productService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string) : Promise<Product>
    {
        return this.productService.getById(parseInt(id));
    }

    @Put(':id')
    updateById(@Param('id') id: string,@Body() body: UpdateProductDto) : Promise<void>
    {
        return this.productService.updateById(parseInt(id),body);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) : Promise<void>
    {
       return this.productService.deleteById(parseInt(id));
    }
}












// app.post('/api/product', async (req, res) => {
//     if(!req.body.name || !req.body.price || !req.body.description || !req.body.categoryId)
//     {   res.send("YOU FORGOT NAME OR PRICE OR DESCRIPTION");
//         res.status(401).end();
//         return;
//     }
//     const product = await Product.create({ 
//         name: req.body.name,
//         price: parseFloat(req.body.price),
//         description: req.body.description,
//         CategoryId: req.body.categoryId,
//     });
//     res.send(product).end();
// });

// app.get('/api/product', async (req, res) => {
//     res.status(200);
//     res.send(await Product.findAll()).end();
// })

// app.get('/api/product/category/:categoryId', async (req, res) => {
//     const id = parseInt(req.params.categoryId);
//   const products =  await Product.findAll({
//         where: {
//             CategoryId : id,
//         },
//     })
    
//     res.status(200);
    
//     res.send(products).end();
// })


// app.get('/api/product/:id', async (req, res) => {
//     const id = parseInt(req.params.id);
//   const products =  await Product.findOne({
//         where: {
//             id : id,
//         },
//     })
    
//     res.status(200);
    
//     res.send(products).end();
// })


// app.put('/api/product/:id', async (req , res) => {
//     const id = parseInt(req.params.id);
//     const values = {};
//     if(req.body.name)
//     {
//         values.name = req.body.name;
//     }
//     if(req.body.price)
//     {
//         values.price = parseFloat(req.body.price);
//     }

//     if(req.body.description)
//     {
//         values.description = req.body.description;
//     }

//     if(req.body.categoryId)
//     {
//         values.CategoryId = req.body.categoryId;
//     }

//     await Product.update(values, {
//         where: {
//             id: id,
//         },
//     });
//     res.send(req.params.id).end();
// })

// app.delete('/api/product/:id', async (req, res) => {
    
//     const id = parseInt(req.params.id);
//     const yes = await Product.findOne({ where: {
//         id,
//     }});
//     if(!yes)
//     {
//         res.status(404);
//         res.send("NOT FOUND").end();
//         return;
//     }
//     else{
//         await Product.destroy({
//             where: {
//               id: id,
//             }
//           });
//     }
//     res.send(yes).end();
// })
