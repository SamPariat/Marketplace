package com.marketplace.market.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Item {

	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	private int itemId;
	private String name;
	private int price;

	public Item(int itemId, String name, int price, int stock, boolean isActive, int categoryId) {
		super();
		this.itemId = itemId;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.isActive = isActive;
		this.categoryId = categoryId;
	}

	@Override
	public String toString() {
		return "Items [itemId=" + itemId + ", name=" + name + ", price=" + price + ", stock=" + stock + ", isActive="
				+ isActive + ", categoryId=" + categoryId + "]";
	}

	public Item() {
		super();
		// TODO Auto-generated constructor stub
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

	private int stock;
	private boolean isActive;
	private int categoryId;

}
