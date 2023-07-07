package com.marketplace.market.models;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ItemSold {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private int soldBy;

    private Timestamp timestamp;

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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getSoldBy() {
        return soldBy;
    }

    public void setSoldBy(int soldBy) {
        this.soldBy = soldBy;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public ItemSold() {
    }

    public ItemSold(int id, String name, int quantity, int soldBy, Timestamp timestamp) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.soldBy = soldBy;
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "ItemSold [id=" + id + ", name=" + name + ", quantity=" + quantity + ", soldBy=" + soldBy
                + ", timestamp=" + timestamp + "]";
    }

}
