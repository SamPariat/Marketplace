package com.marketplace.market.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.models.Item;
import com.marketplace.market.services.ItemServices;

@RestController
public class ItemController {

	@Autowired
	private ItemServices itemServices;

	@GetMapping("/items")
	public List<Item> getItems() {

		return itemServices.findAll();
	}

	@PostMapping("/addItem")
	public Item addItem(@RequestBody Item item) {

		itemServices.save(item);
		return item;
	}

	@GetMapping("/item/{itemId}")
	public Item getItemById(@PathVariable Integer itemId) {

		Item item = itemServices.findById(itemId).orElse(null);
		System.out.println(item.getPrice());
		return item;
	}

	@DeleteMapping("/deleteItem/{itemId}")
	public String deleteItem(@PathVariable Integer itemId) {

		itemServices.deleteById(itemId);
		return "Item deleted";
	}

	@PutMapping("/updateItem")
	public Item updateItem(@RequestBody Item item) {

		itemServices.save(item);
		return item;
	}
	@GetMapping("/items/{name}")
	public List<Item> getItemByName(@PathVariable String name) {

		List<Item> items = itemServices.findByName(name);
		return items;
	}	

}
