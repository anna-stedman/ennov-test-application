import {readFileSync} from 'fs';
import * as path from 'path';
import {parse} from 'csv-parse';

type Product = {
    productId: number;
    productLine: string;
    productBranch: string;
    productGeneric: string;
    productPrice: number;
};

export function readCsvFile(filePath: string) : Product[] {
    const csvFilePath = path.resolve(__dirname, filePath);

    const headers = ['product_id', 'product_line', 'product_brand', 'product_generic', 'product_price'];

    const fileContent = readFileSync(csvFilePath, { encoding: 'utf-8' });

    var res: Product[] = [];
    parse(fileContent, {
        delimiter: ',',
        columns: headers
    }, (error, result: Product[]) => {
        if (error) {
            console.error(error);
        }

        console.log("Result", result);
        res = result;
    })
    return res;
}

