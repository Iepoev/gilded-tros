import { CategorizedItem } from './categorized-item';
import {Item} from './item';

export class GildedTros {
    public categorizedItems : CategorizedItem[];

    constructor(public items: Array<Item>) {
        this.categorizedItems = items.map(item => new CategorizedItem(item));
    }

    public updateQuality(): void {
        this.items.forEach((item, index) => {
            const categorizedItem = this.categorizedItems[index];
            if(!categorizedItem.isEqual(item)) {
                throw Error(`categorized item list out of sync! could not find ${item.name} at index ${index}`,)
            }
            categorizedItem.updateQuality();
        });
    }
}

