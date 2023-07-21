import {Item} from './item';

enum ItemCategories {
    GENERIC,
    GOOD_WINE,
    LEGENDARY,
    BACKSTAGE_PASS,
    SMELLY,
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
            return ItemCategories.LEGENDARY
        } else if(
            name.toLowerCase().includes('duplicate code')
            || name.toLowerCase().includes('long methods')
            || name.toLowerCase().includes('ugly variable Names')) {
            return ItemCategories.SMELLY
        } else {
            return ItemCategories.GENERIC
        }
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

