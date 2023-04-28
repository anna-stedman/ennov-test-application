

import { readCsvFile } from "./csv-reader";

describe('csvReadFile', () => {
    test('does not throw an error', () => {
        expect(() => readCsvFile("./product.csv")).not.toThrowError();
    })
});