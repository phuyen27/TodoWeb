package com.puyen.todoweb.repository;

import com.puyen.todoweb.model.Pet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PetRepository extends MongoRepository<Pet, String> {

    Optional<Pet> findByUserId(String userId);

}
