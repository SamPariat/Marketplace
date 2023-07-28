package com.marketplace.market.models;

import java.sql.Timestamp;
import java.time.LocalDateTime;

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
    private String soldBy;

    private LocalDateTime timestamp;

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

    public String getSoldBy() {
        return soldBy;
    }

    public void setSoldBy(String soldBy) {
        this.soldBy = soldBy;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public ItemSold() {
    }

    public ItemSold(int id, String name, int quantity, String itemSupplier, LocalDateTime localDateTime) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.soldBy = itemSupplier;
        this.timestamp = localDateTime;
    }

    @Override
    public String toString() {
        return "ItemSold [id=" + id + ", name=" + name + ", quantity=" + quantity + ", soldBy=" + soldBy
                + ", timestamp=" + timestamp + "]";
    }

}