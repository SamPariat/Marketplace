package com.marketplace.market.models;

public class NameIdQuantity {
    private String name;
    private int itemId;
    private int quantity;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public NameIdQuantity() {
    }

    public NameIdQuantity(String name, int itemId, int quantity) {
        this.name = name;
        this.itemId = itemId;
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "NameIdQuantity [name=" + name + ", itemId=" + itemId + ", quantity=" + quantity + "]";
    }

}