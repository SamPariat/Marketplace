package com.marketplace.market.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Item {

	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	private int itemId;

	private String name;

	private double price;

	private int stock;

	private boolean active;

	private int discountPer;

	private int discountPrice;

	@OneToOne(cascade = CascadeType.ALL)
	private Category category;

	public Item() {
	}

	public Item(int itemId, String name, double price, int stock, boolean active, int discountPer, int discountPrice,
			Category category) {
		this.itemId = itemId;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.active = active;
		this.discountPer = discountPer;
		this.discountPrice = discountPrice;
		this.category = category;
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "Item [itemId=" + itemId + ", name=" + name + ", price=" + price + ", stock=" + stock + ", active="
				+ active + ", discountPer=" + discountPer + ", discountPrice=" + discountPrice + ", category="
				+ category + "]";
	}



	

}