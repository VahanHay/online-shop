import { Category } from "src/category/category.entity";
import { Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'float8' })
    price: number;

    @Column({type: "varchar"})
    name:  string;

    @Column({type: "text"})
    description: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
}