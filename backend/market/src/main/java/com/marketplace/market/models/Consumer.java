package com.marketplace.market.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Consumer {
	
	@GeneratedValue(strategy = GenerationType.AUTO)
	int id;
	@Id
	String phoneNo;
	String name;
	String address;
	
	@OneToMany(mappedBy = "consumer", cascade = CascadeType.ALL)
    private List<BillingTable> bills;
	
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
		// TODO Auto-generated constructor stub
	}
	public Consumer(int id, String phoneNo, String name, String address) {
		super();
		this.id = id;
		this.phoneNo = phoneNo;
		this.name = name;
		this.address = address;
	}

	
}
