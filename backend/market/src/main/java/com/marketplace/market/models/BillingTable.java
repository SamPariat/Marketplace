package com.marketplace.market.models;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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
	private Timestamp timeStamp;
	private int billerId;
	private int itemId;

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

	public Timestamp getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Timestamp timeStamp) {
		this.timeStamp = timeStamp;
	}

	public int getBillerId() {
		return billerId;
	}

	public void setBillerId(int billerId) {
		this.billerId = billerId;
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public BillingTable() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "BillingTable [billId=" + billId + ", serviceTax=" + serviceTax + ", cgst=" + cgst + ", sgst=" + sgst
				+ ", discountPercentage=" + discountPercentage + ", discountAmount=" + discountAmount + ", totalAmount="
				+ totalAmount + ", timeStamp=" + timeStamp + ", billerId=" + billerId + ", itemId=" + itemId + "]";
	}

}
