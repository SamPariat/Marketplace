package com.marketplace.market.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.models.Consumer;
import com.marketplace.market.models.CustomResponse;
import com.marketplace.market.services.ConsumerServices;

@RestController
@RequestMapping(value = "/consumer")
public class ConsumerController {

	@Autowired
	private ConsumerServices consumerServices;
	
	@GetMapping("/all")
	public ResponseEntity<CustomResponse<List<Consumer>>> getConsumers() {
		try {
			List<Consumer> consumer = consumerServices.findAll();

			if (consumer.isEmpty()) {
				return ResponseEntity.status(HttpStatus.OK)
						.body(new CustomResponse<List<Consumer>>(Collections.emptyList(),
								"No consumers have been added.",
								null));
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<List<Consumer>>(consumer, "All consumers found successfully.", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<List<Consumer>>(null,
					"Some error occurred while fetching the consumers.", e.getMessage()));
		}
	}

	@GetMapping("/{phoneNo}")
	public ResponseEntity<CustomResponse<Consumer>> getItemById(@PathVariable("phoneNo") String phoneNo) {
		try {
			Optional<Consumer> consumer = consumerServices.findByPhoneNo(phoneNo);

			if (!consumer.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new CustomResponse<Consumer>(null, null, "Requested Consumer does not exist."));
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body(new CustomResponse<Consumer>(consumer.get(), "Consumer found successfully.", null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new CustomResponse<Consumer>(null, "Some error occurred while getting the consumer.",
							e.getMessage()));
		}
	}
	@PostMapping("/add-consumer")
	public ResponseEntity<CustomResponse<Consumer>> addConsumer(@RequestBody Consumer consumer) {
	    try {
	    	if (consumerServices.existsById(consumer.getId())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new CustomResponse<Consumer>(null, "The category already exists.",
                                "Existing category cannot be re-added."));
            }
            consumerServices.save(consumer);
	        return ResponseEntity.status(HttpStatus.CREATED)
	                .body(new CustomResponse<Consumer>(consumer, "Consumer added successfully.", null));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(new CustomResponse<Consumer>(null, "Some error occurred while adding the consumer.",
	                        e.getMessage()));
	    }
	}

	@DeleteMapping("/delete-consumer")
	public ResponseEntity<CustomResponse<Consumer>> deleteConsumer(@RequestParam("phoneNo") String phoneNo) {
	    try {
            Optional<Consumer> consumer = consumerServices.findByPhoneNo(phoneNo);
            
            if (!consumer.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new CustomResponse<Consumer>(null, null, "Requested category does not exist."));
            }

            consumerServices.deleteByPhoneNo(phoneNo	);
	        return ResponseEntity.status(HttpStatus.OK)
	                .body(new CustomResponse<Consumer>(null, "Consumer deleted successfully.", null));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(new CustomResponse<Consumer>(null, "Some error occurred while deleting the consumer.",
	                        e.getMessage()));
	    }
	}

}
