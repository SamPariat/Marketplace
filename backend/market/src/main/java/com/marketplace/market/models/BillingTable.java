package com.marketplace.market.models;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class BillingTable {

	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	private int billId;
	@Column(nullable = false, columnDefinition = "INT DEFAULT 9")
	private int serviceTax;

	@Column(nullable = false, columnDefinition = "INT DEFAULT 9")
	private int cgst;

	@Column(nullable = false, columnDefinition = "INT DEFAULT 9")
	private int sgst;

	@Column(nullable = false, columnDefinition = "INT DEFAULT 0")
	private int discountPercentage;
	
	@Column(nullable = false, columnDefinition = "INT DEFAULT 0")
	private int discountAmount;
	private int totalAmount;
	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private LocalDateTime timeStamp;
	private int billerId;

	@OneToMany(mappedBy = "billingTable", fetch = FetchType.EAGER)
	private List<Item> items;
	
	public BillingTable() {
        super();
        this.serviceTax = 9;
        this.cgst = 9;
        this.sgst = 9;
        this.discountPercentage = 0;
        this.discountAmount = 0;
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


	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

}
