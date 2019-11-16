package com.xuezhi.user.domain.repository;

import com.xuezhi.user.domain.entity.User;

public interface UserRepository {
    void addUser(String email, String password);

    void updateUser(String id);

    User getUserById(String id);

    User getUserByEmailAndPassword(String email, String password);

    User getUserByEmail(String email);

}
