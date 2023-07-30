package com.marketplace.market.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Consumer {

	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	int id;
	String phoneNo;
	String name;
	String address;

	@OneToOne(cascade = CascadeType.ALL)
	private BillingTable bills;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Consumer() {
		super();
	}

	public Consumer(int id, String phoneNo, String name, String address) {
		super();
		this.id = id;
		this.phoneNo = phoneNo;
		this.name = name;
		this.address = address;
	}

}
