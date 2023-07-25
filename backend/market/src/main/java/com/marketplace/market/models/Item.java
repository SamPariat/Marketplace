package com.marketplace.market.models;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

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

	private int costPrice;

	private String supplier;

	@ManyToOne
	@JoinColumn(name = "id", nullable = false)
	@JsonBackReference // Exclude items when creating the category
	private Category category;

	@ManyToMany(mappedBy = "items")
	private Set<BillingTable> bills;

	public Item() {
	}

	public Item(int itemId, String name, double price, int stock, boolean active, int discountPer, int costPrice,
			String supplier,
			Category category) {
		this.itemId = itemId;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.active = active;
		this.discountPer = discountPer;
		this.costPrice = costPrice;
		this.supplier = supplier;
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

	public int getCostPrice() {
		return costPrice;
	}

	public void setCostPrice(int costPrice) {
		this.costPrice = costPrice;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	@Override
	public String toString() {
		return "Item [itemId=" + itemId + ", name=" + name + ", price=" + price + ", stock=" + stock + ", active="
				+ active + ", discountPer=" + discountPer + ", costPrice=" + costPrice + ", category" + category
				+ ", supplier=" + supplier + "]";
	}

}