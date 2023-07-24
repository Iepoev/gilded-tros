import { Item } from "./item";

enum ItemCategories {
    GENERIC = 'generic',
    GOOD_WINE = 'good_wine',
    LEGENDARY = 'legendary',
    BACKSTAGE_PASS = 'backstage_pass',
    SMELLY = 'smelly',
}

export class CategorizedItem {
    readonly MAX_QUALITY = 50;
    private category: ItemCategories
    private item: Item

    private readonly categoryUpdateMap: Record<ItemCategories, (() => void)|undefined> = {
        [ItemCategories.GENERIC]: this.updateGeneric.bind(this),
        [ItemCategories.GOOD_WINE]: (() => this.item.quality = this.item.quality + 1).bind(this),
        [ItemCategories.LEGENDARY]: undefined,
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

    constructor(item: Item) {
        this.item = item;
        this.category = this.nameToCategory();
    }

    private nameToCategory() : ItemCategories {
        for (const [category, regex] of Object.entries(this.categoryKeywordsMap)) {
            if(regex?.test(this.item.name.toLowerCase())){
                return category as ItemCategories
            }
        }
        return ItemCategories.GENERIC;
    }

    public updateQuality(): void {
        const updateQualityFn = this.categoryUpdateMap[this.category];
        if(updateQualityFn) {
            updateQualityFn();
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
