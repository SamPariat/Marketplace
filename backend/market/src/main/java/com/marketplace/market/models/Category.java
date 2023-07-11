package com.marketplace.market.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Category {
    @Id
    private int id;

	private String name;

	private int tax;
	
	private int serviceTax;
	
	private boolean isTaxApplicable;

	public void setTaxApplicable(boolean isTaxApplicable) {
		this.isTaxApplicable = isTaxApplicable;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean getIsTaxApplicable() {
		return isTaxApplicable;
	}

	public void setIsTaxApplicable(boolean isTaxApplicable) {
		this.isTaxApplicable = isTaxApplicable;
	}

	public Category() {
	}

	public int getTax() {
		return tax;
	}

	public void setTax(int tax) {
		this.tax = tax;
	}

	public int getServiceTax() {
		return serviceTax;
	}

	public void setServiceTax(int serviceTax) {
		this.serviceTax = serviceTax;
	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", name=" + name + ", tax=" + tax + ", serviceTax=" + serviceTax
				+ ", isTaxApplicable=" + isTaxApplicable + "]";
	}

	public Category(int id, String name, int tax, int serviceTax, boolean isTaxApplicable) {
		super();
		this.id = id;
		this.name = name;
		this.tax = tax;
		this.serviceTax = serviceTax;
		this.isTaxApplicable = isTaxApplicable;
	}

	
}
