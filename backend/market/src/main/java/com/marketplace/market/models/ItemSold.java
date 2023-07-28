package com.marketplace.market.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ItemSold {
    @Id
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

    public ItemSold(int id, String name, int quantity, String soldBy, LocalDateTime timestamp) {
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
