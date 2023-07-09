package com.marketplace.market.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;

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

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "categoryId")
	@JsonIgnore
	private Category category;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "billingTable_id")
	private BillingTable billingTable;

	@Transient
	private int categoryId;
	
	@Transient
	private int billingTable_id;


	public Item(int itemId, String name, double price, int stock, boolean active, Category category, int categoryId) {
		this.itemId = itemId;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.active = active;
		this.category = category;
		this.categoryId = categoryId;
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

	public BillingTable getBillingTable() {
		return billingTable;
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

}
