import {createReadStream} from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';
import { json } from 'stream/consumers';

export type Product = {
    productId: number;
    productLine: string;
    productBranch: string;
    productGeneric: string;
    productPrice: number;
};

export async function readCsvFile(filePath: string) : Promise<Product[]> {
    try {
        const csvFilePath = path.resolve(__dirname, filePath);
    
        return new Promise<Product[]>((resolve, reject) => {
            const res: Product[] = [];

            const stream = createReadStream(csvFilePath, { encoding: 'utf-8' })
                .on('error', (error) => {
                    console.error('Error while opening csv file: ' + error.name + '. Message: ' + error.message);
                    reject(error.message);
                });
            
            stream.pipe(csvParser())
            .on('data', (data: any)=> {
                //This is not working properly. It is throwing an error but not catching it in the 'on error' section. With more time I would figure this out.
                if(data.product_id === undefined || data.product_id === null 
                    || data.product_line === undefined || data.product_line === null
                    || data.product_brand === undefined || data.product_brand === null
                    || data.product_generic === undefined || data.product_generic === null
                    || data.product_price === undefined || data.product_price === null) {
                    throw Error('Error mapping column headers. Please use product_id, product_line, product_brand, product_generic, product_price');
                }

                let product : Product = {
                    productId: Number(data.product_id),
                    productLine: data.product_line,
                    productBranch: data.product_brand,
                    productGeneric: data.product_generic,
                    productPrice: Number(data.product_price)
                };
                res.push(product);
            })
            .on('end', () => resolve(res))
            .on('error', (error: Error)=> {
                console.error('Error while parsing: ' + error.message);
                reject(error.message);
            })
        })
    } catch(error) {
        console.error(error);
    }
    
    return [] as Product[];
}

export function productLineFilter(products: Product[], filter: string) : Product[] {
    return products.filter((value, _, __) => value.productLine.toLowerCase().includes(filter.toLowerCase()));
}

export function productBranchFilter(products: Product[], filter: string) : Product[] {
    return products.filter((value, _, __) => value.productBranch.toLowerCase().includes(filter.toLowerCase()));
}

export function productPriceSum(products: Product[]) : number {
    let sum = 0;
    products.forEach(x => sum += x.productPrice);
    return sum;
}