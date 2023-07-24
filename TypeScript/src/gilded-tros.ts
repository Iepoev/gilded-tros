import {Item} from './item';

enum ItemCategories {
    GENERIC = 'generic',
    GOOD_WINE = 'good_wine',
    LEGENDARY = 'legendary',
    BACKSTAGE_PASS = 'backstage_pass',
    SMELLY = 'smelly',
}

class CategorizedItem {
    readonly MAX_QUALITY = 50;
    private readonly categoryUpdateMap: Record<ItemCategories, () => void> = {
        [ItemCategories.GENERIC]: this.updateGeneric.bind(this),
        [ItemCategories.GOOD_WINE]: (() => this.item.quality = this.item.quality + 1).bind(this),
        [ItemCategories.LEGENDARY]: () => null,
        [ItemCategories.BACKSTAGE_PASS]: this.updateBackstagePass.bind(this),
        [ItemCategories.SMELLY]: this.updateSmelly.bind(this),
    }

    private readonly categoryKeywordsMap: Record<ItemCategories, RegExp|undefined> = {
        [ItemCategories.GENERIC]: undefined,
        [ItemCategories.GOOD_WINE]: /good wine/,
        [ItemCategories.LEGENDARY]: /b-dawg keychain/,
        [ItemCategories.BACKSTAGE_PASS]: /backstage pass/,
        [ItemCategories.SMELLY]: /duplicate code|long methods|ugly variable names/,
    }

    private category: ItemCategories
    private item: Item

    constructor(item: Item) {
        this.item = item;
        this.category = this.nameToCategory(item.name);
    }

    private nameToCategory(name: string) : ItemCategories {
        for (const [category, regex] of Object.entries(this.categoryKeywordsMap)) {
            if(regex?.test(this.item.name.toLowerCase())){
                return category as ItemCategories
            }
        }
        return ItemCategories.GENERIC;
    }

    public updateQuality(): void {
        this.categoryUpdateMap[this.category]();
        if(this.category !== ItemCategories.LEGENDARY) {
            this.item.quality = Math.min(Math.max(this.item.quality, 0), this.MAX_QUALITY)
            this.item.sellIn = this.item.sellIn -1
        }
    }

    public isEqual(item: Item) {
        return this.item.name === item.name;
    }

    private updateGeneric(): void {
        this.item.quality = this.item.sellIn > 0 ? this.item.quality - 1 : this.item.quality - 2
    }

    private updateBackstagePass(): void {
        if(this.item.sellIn <= 0) {
            this.item.quality = 0;
        } else if (this.item.sellIn <= 5) {
            this.item.quality = this.item.quality + 3;
        } else if (this.item.sellIn <= 10) {
            this.item.quality = this.item.quality + 2;
        } else {
            this.item.quality = this.item.quality + 1;
        }
    }

    private updateSmelly(): void {
        this.item.quality = this.item.sellIn > 0 ? this.item.quality - 2 : this.item.quality - 4
    }
}


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

