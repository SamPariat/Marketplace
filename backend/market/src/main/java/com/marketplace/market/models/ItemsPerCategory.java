package com.marketplace.market.models;

public class ItemsPerCategory {
    String categoryName;
    int itemsSold;

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public int getItemsSold() {
        return itemsSold;
    }

    public void setItemsSold(int itemsSold) {
        this.itemsSold = itemsSold;
    }

    public ItemsPerCategory() {
    }

    public ItemsPerCategory(String categoryName, int itemsSold) {
        this.categoryName = categoryName;
        this.itemsSold = itemsSold;
    }

    @Override
    public String toString() {
        return "ItemsPerCategory [categoryName=" + categoryName + ", itemsSold=" + itemsSold + "]";
    }

}
