import {Item} from './item';

enum ItemCategories {
    GENERIC = 'generic',
    GOOD_WINE = 'good_wine',
    LEGENDARY = 'legendary',
    BACKSTAGE_PASS = 'backstage_pass',
    SMELLY = 'smelly',
}

class CategorizedItem extends Item {
    readonly MAX_QUALITY = 50;
    private readonly categoryUpdateMap: Record<ItemCategories, () => void> = {
        [ItemCategories.GENERIC]: this.updateGeneric.bind(this),
        [ItemCategories.GOOD_WINE]: (() => this.quality = this.quality + 1).bind(this),
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

    constructor(item: Item) {
        super(item.name, item.sellIn, item.quality);
        this.category = this.nameToCategory(item.name);
    }

    private nameToCategory(name: string) : ItemCategories {
        for (const [category, regex] of Object.entries(this.categoryKeywordsMap)) {
            if(regex?.test(this.name.toLowerCase())){
                return category as ItemCategories
            }
        }
        return ItemCategories.GENERIC;
    }

    public updateQuality(): void {
        this.categoryUpdateMap[this.category]();
        if(this.category !== ItemCategories.LEGENDARY) {
            this.quality = Math.min(Math.max(this.quality, 0), this.MAX_QUALITY)
            this.sellIn = this.sellIn -1
        }
    }

    private updateGeneric(): void {
        this.quality = this.sellIn > 0 ? this.quality - 1 : this.quality - 2
    }

    private updateBackstagePass(): void {
        if(this.sellIn <= 0) {
            this.quality = 0;
        } else if (this.sellIn <= 5) {
            this.quality = this.quality + 3;
        } else if (this.sellIn <= 10) {
            this.quality = this.quality + 2;
        } else {
            this.quality = this.quality + 1;
        }
    }

    private updateSmelly(): void {
        this.quality = this.sellIn > 0 ? this.quality - 2 : this.quality - 4
    }
}


export class GildedTros {
    public items : CategorizedItem[];

    constructor(inputItems: Item[]) {
        this.items = inputItems.map(item => new CategorizedItem(item));
    }

    public updateQuality(): void {
        this.items.forEach(item => {
            item.updateQuality();
        });
    }
}

