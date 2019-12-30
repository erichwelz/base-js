const { covertToOrdinalNubmer } = require('./module-a');

describe("Ordinal Number", () => {
    test("101 should be 101st", () => {
        expect(covertToOrdinalNubmer(101)).toBe('101st');
    });

    test("1012 should be 1012nd", () => {
        expect(covertToOrdinalNubmer(1012)).toBe('1012nd');
    });

    test("3 should be 3rd", () => {
        expect(covertToOrdinalNubmer(3)).toBe('3rd');
    });

    test("36 should be 36th", () => {
        expect(covertToOrdinalNubmer(36)).toBe('36th');
    });

    test("-1 should throw error 'number is negative'", () => {
        let result;
        try {
            result = covertToOrdinalNubmer(1);
        }catch(err) {
            expect(err.message).toBe('number is negative');
        }
        
    });

    test("a should throw error 'cannot convert a to ordinal number'", () => {
        let result;
        try {
            result = covertToOrdinalNubmer('a');
        }catch(err) {
            expect(err.message).toBe('cannot convert a to ordinal number');
        }
        
    });

    test("a should throw error 'cannot convert a to ordinal number'", () => {
        let result;
        try {
            result = covertToOrdinalNubmer('a');
        }catch(err) {
            expect(err.message).toBe('cannot convert a to ordinal number');
        }
        
    });

    test("3.14 should throw error 'cannot convert float number'", () => {
        let result;
        try {
            result = covertToOrdinalNubmer(3.14);
        }catch(err) {
            expect(err.message).toBe('cannot convert float number');
        }
    });
})