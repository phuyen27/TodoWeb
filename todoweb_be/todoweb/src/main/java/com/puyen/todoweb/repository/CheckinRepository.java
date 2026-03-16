package com.puyen.todoweb.repository;

import com.puyen.todoweb.model.Checkin;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.Optional;

public interface CheckinRepository extends MongoRepository<Checkin,String> {
    Optional<Checkin> findByUserIdAndDate(String userId, Date date);
    Optional<Checkin> findTopByUserIdOrderByDateDesc(String userId);
}
