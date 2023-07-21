import {Item} from './item';

enum ItemCategories {
    GENERIC,
    GOOD_WINE,
    KEYCHAIN,
    BACKSTAGE_PASS,
    SMELLY,
}

type CategorizedItem = {
    name: string,
    quality: number,
    sellIn: number,
    category: ItemCategories
}

export class GildedTros {

    private ItemCategories = ItemCategories;
    private categorizedItems : CategorizedItem[] = [];

    constructor(public items: Item[]) {
        this.categorizedItems = items.map(this.transformItem);
    }

    private transformItem(item: Item) : CategorizedItem {
        return {
            name: item.name,
            quality: item.quality,
            sellIn: item.sellIn,
            category: this.nameToCategory(item.name),
        };
    }

    private nameToCategory(name: string) : ItemCategories {
        if(name.includes('Good Wine')) {
            return ItemCategories.GOOD_WINE
        } else if(name.includes('Backstage pass')) {
            return ItemCategories.BACKSTAGE_PASS
        } else if(name.includes('B-DAWG Keychain')) {
            return ItemCategories.KEYCHAIN
        } else if(
            name.includes('Duplicate Code')
            || name.includes('Long Methods')
            || name.includes('Ugly Variable Names')) {
            return ItemCategories.SMELLY
        } else {
            return ItemCategories.GENERIC
        }
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

