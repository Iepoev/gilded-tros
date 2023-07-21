import {Item} from '../src/item';
import {GildedTros} from '../src/gilded-tros';

describe('GildedTrosTest', () => {
    test('single generic item', () => {
        const items: Item[] = [new Item('generic', 2, 5)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(1);
        expect(app.items[0].quality).toEqual(4);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(3);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-1);
        expect(app.items[0].quality).toEqual(1);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-2);
        expect(app.items[0].quality).toEqual(0);
        expect(app.items[0].name).toEqual('generic');
    })
    test('single good wine', () => {
        const items: Item[] = [new Item('Good Wine', 2, 47)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(1);
        expect(app.items[0].quality).toEqual(48);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(49);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-1);
        expect(app.items[0].quality).toEqual(50);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-2);
        expect(app.items[0].quality).toEqual(50);
    })
    test('single keychain', () => {
        const items: Item[] = [new Item('B-DAWG Keychain', 0, 5)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(5);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(5);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(5);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(5);
    })
    test('single Backstage pass', () => {
        const items: Item[] = [new Item('Backstage passes for Re:Factor', 11, 0)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(10);
        expect(app.items[0].quality).toEqual(1);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(9);
        expect(app.items[0].quality).toEqual(3);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(8);
        expect(app.items[0].quality).toEqual(5);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(7);
        expect(app.items[0].quality).toEqual(7);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(6);
        expect(app.items[0].quality).toEqual(9);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(5);
        expect(app.items[0].quality).toEqual(11);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(4);
        expect(app.items[0].quality).toEqual(14);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(3);
        expect(app.items[0].quality).toEqual(17);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(2);
        expect(app.items[0].quality).toEqual(20);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(1);
        expect(app.items[0].quality).toEqual(23);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(26);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-1);
        expect(app.items[0].quality).toEqual(28);// should be 0?
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-2);
        expect(app.items[0].quality).toEqual(30);// should be 0?
    })
    test('single smelly item', () => {
        const items: Item[] = [new Item('Duplicate Code', 2, 20)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(1);
        expect(app.items[0].quality).toEqual(18);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(16);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-1);
        expect(app.items[0].quality).toEqual(12);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-2);
        expect(app.items[0].quality).toEqual(8);
    })
});
