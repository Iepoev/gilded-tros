import {Item} from './item';

enum ItemCategories {
    GENERIC,
    GOOD_WINE,
    KEYCHAIN,
    BACKSTAGE_PASS,
    SMELLY,
}

class CategorizedItem extends Item {
    private category: ItemCategories

    constructor(item: Item) {
        super(item.name, item.sellIn, item.quality);
        this.category = this.nameToCategory(item.name);
    }

    private nameToCategory(name: string) : ItemCategories {
        if(name.toLowerCase().includes('good wine')) {
            return ItemCategories.GOOD_WINE
        } else if(name.toLowerCase().includes('backstage pass')) {
            return ItemCategories.BACKSTAGE_PASS
        } else if(name.toLowerCase().includes('b-dawg keychain')) {
            return ItemCategories.KEYCHAIN
        } else if(
            name.toLowerCase().includes('duplicate code')
            || name.toLowerCase().includes('long methods')
            || name.toLowerCase().includes('ugly variable Names')) {
            return ItemCategories.SMELLY
        } else {
            return ItemCategories.GENERIC
        }
    }

}


export class GildedTros {
    public items : CategorizedItem[];

    constructor(inputItems: Item[]) {
        // todo items property should not be altered, store a copy of categorized items instead
        this.items = inputItems.map(item => new CategorizedItem(item));
    }

    public updateQuality(): void {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name != 'Good Wine' && this.items[i].name != 'Backstage passes for Re:Factor'
                && this.items[i].name != 'Backstage passes for HAXX') {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'B-DAWG Keychain') {
                        this.items[i].quality = this.items[i].quality - 1;
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1;

                    if (this.items[i].name == 'Backstage passes for Re:Factor') {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1;
                            }
                        }

                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1;
                            }
                        }
                    }
                }
            }

            if (this.items[i].name != 'B-DAWG Keychain') {
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }

            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Good Wine') {
                    if (this.items[i].name != 'Backstage passes for Re:Factor' || this.items[i].name != 'Backstage passes for HAXX') {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name != 'B-DAWG Keychain') {
                                this.items[i].quality = this.items[i].quality - 1;
                            }
                        }
                    } else {
                        this.items[i].quality = this.items[i].quality - this.items[i].quality;
                    }
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1;
                    }
                }
            }
        }
    }
}

