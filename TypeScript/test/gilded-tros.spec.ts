import {Item} from '../src/item';
import {GildedTros} from '../src/gilded-tros';

describe('GildedTrosTest', () => {
    test('single generic item', () => {
        const items: Item[] = [new Item('generic', 0, 0)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].name).toEqual('generic');
    })
});
