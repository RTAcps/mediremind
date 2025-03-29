package com.mediremind.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mediremind.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
