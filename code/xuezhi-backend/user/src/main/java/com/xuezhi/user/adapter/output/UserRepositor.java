package com.xuezhi.user.adapter.output;

import com.xuezhi.user.domain.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface UserRepositor extends MongoRepository<User, String> {
    User findUserById(String id);

    User findUserByEmailAndPassword(String email, String password);

    User findByEmail(String email);
}
