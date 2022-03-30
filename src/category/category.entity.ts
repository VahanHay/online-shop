import { Product } from "src/product/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar"})
    name:  string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}