package com.marketplace.market.models;

import java.time.LocalDateTime;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class BillingTable {

	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	private int billId;

	private int serviceTax;

	private int cgst;

	private int sgst;

	private int discountPercentage;

	private int discountAmount;

	private int totalAmount;

	@JsonIgnore
	private LocalDateTime timeStamp;

	private int billerId;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(name = "billing_table_items", joinColumns = {
			@JoinColumn(name = "billing_table_id") }, inverseJoinColumns = {
					@JoinColumn(name = "item_id") })
	private Set<Item> items;

	public BillingTable() {
		super();
	}

	public BillingTable(int billId, int serviceTax, int cgst, int sgst, int discountPercentage, int discountAmount,
			int totalAmount, LocalDateTime timeStamp, int billerId, Set<Item> items) {
		this.billId = billId;
		this.serviceTax = serviceTax;
		this.cgst = cgst;
		this.sgst = sgst;
		this.discountPercentage = discountPercentage;
		this.discountAmount = discountAmount;
		this.totalAmount = totalAmount;
		this.timeStamp = timeStamp;
		this.billerId = billerId;
		this.items = items;
	}

	public int getBillId() {
		return billId;
	}

	public void setBillId(int billId) {
		this.billId = billId;
	}

	public int getServiceTax() {
		return serviceTax;
	}

	public void setServiceTax(int serviceTax) {
		this.serviceTax = serviceTax;
	}

	public int getCgst() {
		return cgst;
	}

	public void setCgst(int cgst) {
		this.cgst = cgst;
	}

	public int getSgst() {
		return sgst;
	}

	public void setSgst(int sgst) {
		this.sgst = sgst;
	}

	public int getDiscountPercentage() {
		return discountPercentage;
	}

	public void setDiscountPercentage(int discountPercentage) {
		this.discountPercentage = discountPercentage;
	}

	public int getDiscountAmount() {
		return discountAmount;
	}

	public void setDiscountAmount(int discountAmount) {
		this.discountAmount = discountAmount;
	}

	public int getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(int totalAmount) {
		this.totalAmount = totalAmount;
	}

	public LocalDateTime getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(LocalDateTime timeStamp) {
		this.timeStamp = timeStamp;
	}

	public int getBillerId() {
		return billerId;
	}

	public void setBillerId(int billerId) {
		this.billerId = billerId;
	}

	public Set<Item> getItems() {
		return items;
	}

	public void setItems(Set<Item> items) {
		this.items = items;
	}

	@Override
	public String toString() {
		return "BillingTable [billId=" + billId + ", serviceTax=" + serviceTax + ", cgst=" + cgst + ", sgst=" + sgst
				+ ", discountPercentage=" + discountPercentage + ", discountAmount=" + discountAmount + ", totalAmount="
				+ totalAmount + ", timeStamp=" + timeStamp + ", billerId=" + billerId + ", items=" + items + "]";
	}

}
