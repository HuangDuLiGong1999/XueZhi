package com.xuezhi.endpoint.Repository;

import com.xuezhi.endpoint.Entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepository extends MongoRepository<User, String> {
    public User findByEmail(String email);
    public User findByEmailAndPassword(String email, String password);
}
