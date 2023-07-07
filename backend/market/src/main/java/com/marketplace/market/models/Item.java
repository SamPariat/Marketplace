package com.marketplace.market.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Item {

	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	private int itemId;
	private String name;
	private int price;
	private int discountPer;
	private int discountPrice;
	private int stock;
	private boolean isActive;
	private int categoryId;

	public int getDiscountPer() {
		return discountPer;
	}

	public void setDiscountPer(int discountPer) {
		this.discountPer = discountPer;
	}

	public int getDiscountPrice() {
		return discountPrice;
	}

	public void setDiscountPrice(int discountPrice) {
		this.discountPrice = discountPrice;
	}

	@ManyToOne
    @JoinColumn(name = "billingTable_id")
    private BillingTable billingTable;
		
	public BillingTable getBillingTable() {
		return billingTable;
	}

	

	@Override
	public String toString() {
		return "Item [itemId=" + itemId + ", name=" + name + ", price=" + price + ", discountPer=" + discountPer
				+ ", discountPrice=" + discountPrice + ", billingTable=" + billingTable + ", stock=" + stock
				+ ", isActive=" + isActive + ", categoryId=" + categoryId + "]";
	}

	public void setBillingTable(BillingTable billingTable) {
		this.billingTable = billingTable;
	}

	public Item() {
		super();
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}


}
