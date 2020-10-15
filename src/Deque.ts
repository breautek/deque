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

import {Iterator} from '@breautek/iterator';

export interface IDequeIteratorFunction<T> {
    (item: T, index: number): void;
}

class Deque<T> {
    private _data: {[key: string]: T};
    private _lowerBound: number;
    private _upperBound: number;

    public constructor() {
        this._data = {};
        this._lowerBound = 0;
        this._upperBound = 0;
    }

    public first(): T {
        let iterator: Iterator<T> = this.iterator();
        let item: T = null;
        do {
            item = iterator.next();
        } while (iterator.hasNext() && (item === null || item === undefined));

        return item;
    }

    public last(): T {
        let iterator: Iterator<T> = this.reverseIterator();
        let item: T = null;
        do {
            item = iterator.next();
        } while (iterator.hasNext() && (item === null || item === undefined));

        return item;
    }

    public getLowerBound(): number {
        return this._lowerBound;
    }

    public getUpperBound(): number {
        return this._upperBound;
    }

    public unshift(item: T): Deque<T> {
        this._data[--this._lowerBound] = item;
        return this;
    }

    public push(item: T): Deque<T> {
        this._data[this._upperBound++] = item;
        return this;
    }

    public count(): number {
        return Object.keys(this._data).length;
    }

    public length(): number {
        return Math.abs(this._lowerBound - this._upperBound);
    }

    public set(index: number, item: T): Deque<T> {
        if (isNaN(index)) {
            throw new Error('Index must be an integer.');
        }

        this._data[index] = item;
        this._syncBoundaries();

        return this;
    }

    public has(index: number): boolean {
        return this._data[index] !== undefined;
    }

    public get(index: number): T {
        return this._data[index];
    }

    public shift(): T {
        let data: T = this._data[this._lowerBound];
        delete this._data[this._lowerBound];
        this._lowerBound++;
        return data;
    }

    public pop(): T {
        let data: T = this._data[this._upperBound - 1];
        delete this._data[this._upperBound - 1];
        this._upperBound--;
        return data;
    }

    public iterate(fn: IDequeIteratorFunction<T>): void {
        if (!fn) return null;

        for (let i: number = this.getLowerBound(); i <= this.getUpperBound() - 1; i++) {
            fn(this.get(i), i);
        }
    }

    public reverseIterate(fn: IDequeIteratorFunction<T>): void {
        if (!fn) return null;

        for (let i: number = this.getUpperBound() - 1; i >= this.getLowerBound(); i--) {
            fn(this.get(i), i);
        }
    }

    public iterator(): Iterator<T> {
        let arr: Array<T> = [];

        for (let i: number = this._lowerBound; i <= this._upperBound; i++) {
            arr.push(this._data[i]);
        }

        return new Iterator(arr);
    }

    public reverseIterator(): Iterator<T> {
        let arr: Array<T> = [];

        for (let i: number = this._lowerBound; i <= this._upperBound; i++) {
            arr.push(this._data[i]);
        }

        return new Iterator(arr.reverse());
    }

    private _syncBoundaries(): void {
        let keys: Array<string> = Object.keys(this._data);

        let lowest: number = Infinity
        let highest: number = -Infinity;

        for (let i: number = 0; i < keys.length; i++) {
            let index = parseInt(keys[i]);

            if (index < lowest) {
                lowest = index;
            }

            if (index > highest) {
                highest = index;
            }
        }

        this._lowerBound = lowest;
        this._upperBound = highest;
    }

    public toArray(recursive: boolean = false): Array<T> {
        let arr: Array<T> = [];

        for (let i = this.getLowerBound(); i <= this.getUpperBound(); i++) {
            if (recursive) {
                let item: T = this.get(i);
                if (item instanceof Deque) {
                    // any is used here because we don't care about the subtype of child Deque here.
                    // however, Typescript won't allow us to push the type to the possibile difference 
                    // between our T and their T
                    arr.push((<any>item).toArray(recursive));
                }
                else {
                    arr.push(item);
                }
            }
            else {
                arr.push(this.get(i));
            }
        }

        return arr;
    }
}

export { Deque };
export default Deque;
