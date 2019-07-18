/*
MIT License

Copyright (c) 2019 Norman Breau

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import {Deque} from '../src/Deque';
import {Iterator} from '@breautek/iterator';

describe('Deque', () => {
    var deque: Deque<number>;

    const setup = (): void => {
        deque = new Deque<number>();
        deque.push(1);
        deque.push(3);
        deque.push(5);
    };

    beforeEach(() => {
        setup();
    });

    it('Expect first() to be 1', () => {
        expect(deque.first()).toBe(1);
    });

    it('Expect last() to be 5', () => {
        expect(deque.last()).toBe(5);
    });

    it('getLowerBound()', () => {
        expect(deque.getLowerBound()).toBe(0);
    });

    it('getUpperBound()', () => {
        expect(deque.getUpperBound()).toBe(3);
    });

    it('count()', () => {
        expect(deque.count()).toBe(3);
    });

    it('length()', () => {
        expect(deque.length()).toBe(3);
    });

    describe('unshift()', () => {
        let result: Deque<number>;
        
        beforeEach(() => {
            setup();
            result = deque.unshift(100);
        });

        it('returns the same instance', () => {
            expect(result).toBe(deque);
        });

        it('first value is 100', () => {
            expect(result.first()).toBe(100);
        });

        it('lower bound is -1', () => {
            expect(result.getLowerBound()).toBe(-1);
        });

        it('count is 4', () => {
            expect(result.count()).toBe(4);
        });

        it('length is 4', () => {
            expect(result.length()).toBe(4);
        });
    });

    describe('push()', () => {
        let result: Deque<number>;

        beforeEach(() => {
            setup();
            result = deque.push(100);
        });

        it('returns the same instance', () => {
            expect(result).toBe(deque);
        });

        it('last value is 100', () => {
            expect(result.last()).toBe(100);
        });

        it('upper bound is 4', () => {
            expect(result.getUpperBound()).toBe(4);
        });

        it('count is 4', () => {
            expect(result.count()).toBe(4);
        });

        it('length is 4', () => {
            expect(result.length()).toBe(4);
        });
    });

    describe('set()', () => {
        let result: Deque<number>;

        beforeEach(() => {
            setup();
            result = deque.set(100, 100);
        });

        it('returns the same instance', () => {
            expect(result).toBe(deque);
        });

        it('last value is 100', () => {
            expect(result.last()).toBe(100);
        });

        it('upper bound is 100', () => {
            expect(result.getUpperBound()).toBe(100);
        });

        it('count is 4', () => {
            expect(result.count()).toBe(4);
        });

        it('length is 100', () => {
            expect(result.length()).toBe(100);
        });
    });

    describe('has()', () => {
        beforeEach(() => {
            setup();
        });

        it('index 0 should return true', () => {
            expect(deque.has(0)).toBe(true);
        });

        it('index 1 should return true', () => {
            expect(deque.has(1)).toBe(true);
        });

        it('index 2 should return true', () => {
            expect(deque.has(2)).toBe(true);
        });

        it('index 3 should return false', () => {
            expect(deque.has(3)).toBe(false);
        });

        it('index -1 should return false', () => {
            expect(deque.has(-1)).toBe(false);
        });
    });

    describe('get()', () => {
        beforeEach(() => {
            setup();
        });

        it('index 0 should return 1', () => {
            expect(deque.get(0)).toBe(1);
        });

        it('index 1 should return 3', () => {
            expect(deque.get(1)).toBe(3);
        });

        it('index 2 should return 5', () => {
            expect(deque.get(2)).toBe(5);
        });

        it('index -1 should return undefined', () => {
            expect(deque.get(-1)).toBe(undefined);
        });
    });

    describe('unshift/push should not collide', () => {
        beforeEach(() => {
            setup();
            deque = new Deque<number>();
            deque.unshift(-100);
            deque.push(100);
        });

        it('first() is -100', () => {
            expect(deque.first()).toBe(-100);
        });

        it('lowerBound is -1', () => {
            expect(deque.getLowerBound()).toBe(-1);
        });

        it('index -1 is -100', () => {
            expect(deque.get(-1)).toBe(-100);
        });

        it('last() is 100', () => {
            expect(deque.last()).toBe(100);
        });

        it('upperBound is 1', () => {
            expect(deque.getUpperBound()).toBe(1);
        });

        it('index 0 is 100', () => {
            expect(deque.get(0)).toBe(100);
        });

        it('count is 2', () => {
            expect(deque.count()).toBe(2);
        });

        it('length is 2', () => {
            expect(deque.length()).toBe(2);
        });
    });

    describe('shift()', () => {
        let result: number;
        beforeEach(() => {
            setup();
            result = deque.shift();
        });

        it('lower bound should increase', () => {
            expect(deque.getLowerBound()).toBe(1);
        });

        it('upper bound should be kept the same', () => {
            expect(deque.getUpperBound()).toBe(3);
        });

        it('result should be 1', () => {
            expect(result).toBe(1);
        });

        it('index -1 should be undefined', () => {
            expect(deque.get(-1)).toBe(undefined);
        });

        it('first should be 3', () => {
            expect(deque.first()).toBe(3);
        });
    });

    describe('shift()', () => {
        let result: number;
        beforeEach(() => {
            setup();
            result = deque.pop();
        });

        it('lower bound should be kept the same', () => {
            expect(deque.getLowerBound()).toBe(0);
        });

        it('upper bound should decrease', () => {
            expect(deque.getUpperBound()).toBe(2);
        });

        it('result should be 5', () => {
            expect(result).toBe(5);
        });

        it('index 2 should be undefined', () => {
            expect(deque.get(2)).toBe(undefined);
        });

        it('first should be 1', () => {
            expect(deque.first()).toBe(1);
        });

        it('last should be 3', () => {
            expect(deque.last()).toBe(3);
        });
    });

    it('iterate', () => {
        const spy: jasmine.Spy = jasmine.createSpy('iterator spy');
        deque.iterate(spy);

        expect(spy).toHaveBeenCalledTimes(3);

        const args0: Array<number> = spy.calls.argsFor(0);
        const args1: Array<number> = spy.calls.argsFor(1);
        const args2: Array<number> = spy.calls.argsFor(2);

        expect(args0[1]).withContext('Iteration #0').toBe(0);
        expect(args0[0]).withContext('Iteration #0').toBe(1);
        
        expect(args1[1]).withContext('Iteration #1').toBe(1);
        expect(args1[0]).withContext('Iteration #1').toBe(3);

        expect(args2[1]).withContext('Iteration #2').toBe(2);
        expect(args2[0]).withContext('Iteration #2').toBe(5);
    });

    it('reverse iterate', () => {
        const spy: jasmine.Spy = jasmine.createSpy('iterator spy');
        deque.reverseIterate(spy);

        expect(spy).toHaveBeenCalledTimes(3);

        const args0: Array<number> = spy.calls.argsFor(2);
        const args1: Array<number> = spy.calls.argsFor(1);
        const args2: Array<number> = spy.calls.argsFor(0);

        expect(args0[1]).withContext('Iteration #0').toBe(0);
        expect(args0[0]).withContext('Iteration #0').toBe(1);
        
        expect(args1[1]).withContext('Iteration #1').toBe(1);
        expect(args1[0]).withContext('Iteration #1').toBe(3);

        expect(args2[1]).withContext('Iteration #2').toBe(2);
        expect(args2[0]).withContext('Iteration #2').toBe(5);
    });

    describe('iterator', () => {
        setup();
        const iterator: Iterator<number> = deque.iterator();

        const result0: number = iterator.next();
        const result1: number = iterator.next();
        const result2: number = iterator.next();

        it('Iteration #0', () => {
            expect(result0).toBe(1);
        });

        it('Iteration #1', () => {
            expect(result1).toBe(3);
        });

        it('Iteration #2', () => {
            expect(result2).toBe(5);
        });
    });

    // Disabled because of a breaking change required to make this
    // work as expected...
    xdescribe('reverseIterator', () => {
        setup();
        const iterator: Iterator<number> = deque.reverseIterator();

        const result0: number = iterator.next();
        const result1: number = iterator.next();
        const result2: number = iterator.next();

        xit('Iteration #0', () => {
            expect(result0).toBe(5);
        });

        xit('Iteration #1', () => {
            expect(result1).toBe(3);
        });

        xit('Iteration #2', () => {
            expect(result2).toBe(1);
        });
    });

    describe('toArray()', () => {
        setup();

        const arr: Array<number> = deque.toArray();

        it('Element #0', () => {
            expect(arr[0]).toBe(1);
        });

        it('Element #1', () => {
            expect(arr[1]).toBe(3);
        });

        it('Element #2', () => {
            expect(arr[2]).toBe(5);
        });
    });

    describe('toArray(true)', () => {
        setup();

        const arr: Array<number> = deque.toArray(true);

        it('Element #0', () => {
            expect(arr[0]).toBe(1);
        });

        it('Element #1', () => {
            expect(arr[1]).toBe(3);
        });

        it('Element #2', () => {
            expect(arr[2]).toBe(5);
        });
    });
});
