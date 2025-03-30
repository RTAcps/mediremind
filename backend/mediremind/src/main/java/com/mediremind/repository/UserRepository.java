package com.mediremind.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.mediremind.model.User;

public interface UserRepository extends MongoRepository<User, String> {
	Page<User> findAll(Pageable pageable);
}
